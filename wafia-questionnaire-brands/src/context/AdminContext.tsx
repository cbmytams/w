import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type {
  AdminSessionUser,
  AuditEvent,
  DashboardFilters,
  FunnelStep,
  KpiCard,
  Lead,
  LeadListPage,
  LeadRecord,
  Role,
} from "../types";
import { getLocalLeads, updateLocalLeadStatus } from "../lib/localLeads";

interface AdminContextType {
  leads: Lead[];
  loading: boolean;
  refreshLeads: () => Promise<void>;
  updateLeadStatus: (id: string, status: string) => Promise<void>;
  metrics: {
    totalLeads: number;
    conversionRate: number;
    activeLeads: number;
    avgScore: number;
  };
  analytics: {
    velocity: { date: string; value: number }[];
    funnel: { name: string; value: number; fill: string }[];
    dropOffs: { question: string; dropRate: string }[];
  };
  kpis: KpiCard[];
  funnelSteps: FunnelStep[];
  auditEvents: AuditEvent[];
  filters: DashboardFilters;
  setFilters: (next: DashboardFilters) => void;
  role: Role | null;
  helpMode: boolean;
  setHelpMode: (value: boolean) => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

const MOCK_LEADS: Lead[] = [
  {
    id: "1",
    name: "Sophie Martin",
    email: "sophie.m@creator.com",
    score: 78,
    level: "Mature",
    date: new Date(Date.now() - 7200000).toISOString(),
    status: "contacted",
  },
  {
    id: "2",
    name: "Thomas Dubreuil",
    email: "tom.d@gmail.com",
    score: 45,
    level: "Growth",
    date: new Date(Date.now() - 18000000).toISOString(),
    status: "new",
  },
  {
    id: "3",
    name: "Léa Dubois",
    email: "lea@studio.fr",
    score: 92,
    level: "Expert",
    date: new Date(Date.now() - 86400000).toISOString(),
    status: "signed",
  },
];

const FALLBACK_ALLOWED =
  import.meta.env.DEV &&
  import.meta.env.VITE_ALLOW_LOCAL_ADMIN_FALLBACK === "true";

const STATUS_API_TO_UI: Record<LeadRecord["status"], Lead["status"]> = {
  NEW: "new",
  IN_PROGRESS: "contacted",
  COMPLETED: "contacted",
  QUALIFIED: "qualified",
  INTERVIEW: "signed",
  REJECTED: "archived",
  ARCHIVED: "archived",
};

const STATUS_UI_TO_API: Record<Lead["status"], LeadRecord["status"]> = {
  new: "NEW",
  contacted: "IN_PROGRESS",
  qualified: "QUALIFIED",
  signed: "INTERVIEW",
  archived: "ARCHIVED",
};

const FUNNEL_COLORS = ["#3b82f6", "#60a5fa", "#93c5fd", "#10b981", "#f59e0b"];

function toIsoDay(date: Date) {
  return date.toISOString().slice(0, 10);
}

function getDefaultFilters(): DashboardFilters {
  const now = new Date();
  const from = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
  return {
    from: toIsoDay(from),
    to: toIsoDay(now),
    source: "questionnaire",
  };
}

function readFiltersFromUrl(): DashboardFilters {
  const defaults = getDefaultFilters();
  if (typeof window === "undefined") return defaults;

  const search = new URLSearchParams(window.location.search);
  return {
    from: search.get("from") || defaults.from,
    to: search.get("to") || defaults.to,
    source:
      (search.get("source") as DashboardFilters["source"]) || defaults.source,
    segment: search.get("segment") || undefined,
    owner: search.get("owner") || undefined,
    status: search.get("status") || undefined,
  };
}

function filtersToQueryString(filters: DashboardFilters): string {
  const params = new URLSearchParams();
  Object.entries(filters).forEach(([key, value]) => {
    if (value) params.set(key, value);
  });
  return params.toString();
}

function mapLeadRecordToLead(record: LeadRecord): Lead {
  return {
    id: record.id,
    name: record.name,
    email: record.email || record.emailMasked || "",
    phone: record.phone || record.phoneMasked || undefined,
    emailMasked: record.emailMasked,
    phoneMasked: record.phoneMasked,
    score: 0,
    level: record.status,
    date: record.createdAt,
    status: STATUS_API_TO_UI[record.status],
    priority: record.priority,
    slaState: record.slaState,
  };
}

async function fetchJson<T>(url: string): Promise<T> {
  const maxRetries = 2;
  let attempt = 0;
  let lastError: Error | null = null;

  while (attempt <= maxRetries) {
    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => controller.abort(), 10000);

    try {
      const response = await fetch(url, {
        credentials: "include",
        signal: controller.signal,
      });

      if (!response.ok) {
        const payload = (await response.json().catch(() => ({}))) as {
          error?: string;
        };
        throw new Error(payload.error || `Request failed (${response.status})`);
      }

      return response.json() as Promise<T>;
    } catch (error) {
      lastError =
        error instanceof Error ? error : new Error("Unknown request error");
      if (attempt >= maxRetries) {
        throw lastError;
      }
      attempt += 1;
      await new Promise((resolve) => setTimeout(resolve, 250 * attempt));
    } finally {
      window.clearTimeout(timeoutId);
    }
  }

  throw lastError || new Error("Request failed");
}

export function AdminProvider({ children }: { children: ReactNode }) {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [kpis, setKpis] = useState<KpiCard[]>([]);
  const [funnelSteps, setFunnelSteps] = useState<FunnelStep[]>([]);
  const [auditEvents, setAuditEvents] = useState<AuditEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState<Role | null>(null);
  const [filters, setFilters] = useState<DashboardFilters>(() =>
    readFiltersFromUrl()
  );
  const [helpMode, setHelpMode] = useState(() => {
    if (typeof window === "undefined") return false;
    return localStorage.getItem("admin_help_mode") === "true";
  });

  const loadLocalFallback = useCallback(() => {
    const local = getLocalLeads();
    setLeads(local.length > 0 ? local : MOCK_LEADS);
    setKpis([]);
    setFunnelSteps([]);
    setAuditEvents([]);
  }, []);

  const fetchDashboardData = useCallback(
    async (activeFilters: DashboardFilters) => {
      setLoading(true);
      try {
        const query = filtersToQueryString(activeFilters);

        const [sessionPayload, overviewPayload, funnelPayload, leadsPayload] =
          await Promise.all([
            fetchJson<{ user: AdminSessionUser }>("/api/v1/admin/session"),
            fetchJson<{ kpis: KpiCard[] }>(
              `/api/v1/dashboard/overview?${query}`
            ),
            fetchJson<{ steps: FunnelStep[] }>(
              `/api/v1/dashboard/funnel?${query}`
            ),
            fetchJson<LeadListPage>(
              `/api/v1/dashboard/leads?limit=100&${query}`
            ),
          ]);

        setRole(sessionPayload.user.role);
        setKpis(overviewPayload.kpis);
        setFunnelSteps(funnelPayload.steps);
        setLeads(leadsPayload.items.map(mapLeadRecordToLead));
        try {
          const auditPayload = await fetchJson<{ events: AuditEvent[] }>(
            `/api/v1/dashboard/audit?${query}`
          );
          setAuditEvents(auditPayload.events);
        } catch {
          setAuditEvents([]);
        }
      } catch (error) {
        if (import.meta.env.DEV) {
          console.warn("Dashboard API fetch failed", error);
        }
        if (FALLBACK_ALLOWED) {
          loadLocalFallback();
        } else {
          setLeads([]);
          setKpis([]);
          setFunnelSteps([]);
          setAuditEvents([]);
        }
      } finally {
        setLoading(false);
      }
    },
    [loadLocalFallback]
  );

  const refreshLeads = useCallback(async () => {
    await fetchDashboardData(filters);
  }, [fetchDashboardData, filters]);

  const updateLeadStatus = useCallback(
    async (id: string, status: string) => {
      const nextStatus = status as Lead["status"];
      const apiStatus = STATUS_UI_TO_API[nextStatus];

      setLeads((prev) =>
        prev.map((lead) =>
          lead.id === id ? { ...lead, status: nextStatus } : lead
        )
      );

      try {
        await fetch("/api/v1/dashboard/leads", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ id, status: apiStatus }),
        }).then(async (response) => {
          if (!response.ok) {
            const payload = (await response.json().catch(() => ({}))) as {
              error?: string;
            };
            throw new Error(payload.error || "Unable to update lead status");
          }
        });
      } catch (error) {
        if (import.meta.env.DEV) {
          console.error("Failed to update lead status", error);
        }
        if (FALLBACK_ALLOWED) {
          updateLocalLeadStatus(id, nextStatus);
        }
        await refreshLeads();
      }
    },
    [refreshLeads]
  );

  useEffect(() => {
    void fetchDashboardData(filters);
  }, [fetchDashboardData, filters]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const query = filtersToQueryString(filters);
    const nextUrl = query
      ? `${window.location.pathname}?${query}`
      : window.location.pathname;
    window.history.replaceState({}, "", nextUrl);
  }, [filters]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    localStorage.setItem("admin_help_mode", helpMode.toString());
  }, [helpMode]);

  useEffect(() => {
    if (!FALLBACK_ALLOWED || typeof window === "undefined") return;
    const handler = () => {
      loadLocalFallback();
    };
    window.addEventListener("wafia-local-leads-updated", handler);
    return () =>
      window.removeEventListener("wafia-local-leads-updated", handler);
  }, [loadLocalFallback]);

  const metrics = useMemo(() => {
    const byId = new Map(kpis.map((kpi) => [kpi.id, kpi]));
    const totalLeads = Math.round(
      byId.get("leads_incoming")?.value ?? leads.length
    );
    const conversionRate = Math.round(
      byId.get("conversion_to_interview_rate")?.value ?? 0
    );
    const activeLeads = leads.filter(
      (lead) =>
        lead.status === "new" ||
        lead.status === "contacted" ||
        lead.status === "qualified"
    ).length;
    const avgScore = Math.round(
      leads.reduce((acc, lead) => acc + lead.score, 0) / (leads.length || 1)
    );

    return {
      totalLeads,
      conversionRate,
      activeLeads,
      avgScore,
    };
  }, [kpis, leads]);

  const analytics = useMemo(() => {
    const now = new Date();
    const velocityMap = new Map<string, number>();
    for (let i = 6; i >= 0; i--) {
      const day = new Date(now);
      day.setDate(day.getDate() - i);
      const dateStr = `${day.getDate().toString().padStart(2, "0")}/${(day.getMonth() + 1).toString().padStart(2, "0")}`;
      velocityMap.set(dateStr, 0);
    }

    leads.forEach((lead) => {
      const date = new Date(lead.date);
      if (Number.isNaN(date.getTime())) return;
      const dateStr = `${date.getDate().toString().padStart(2, "0")}/${(date.getMonth() + 1).toString().padStart(2, "0")}`;
      if (velocityMap.has(dateStr)) {
        velocityMap.set(dateStr, (velocityMap.get(dateStr) || 0) + 1);
      }
    });

    const funnel = funnelSteps.map((step, index) => ({
      name: step.label,
      value: step.value,
      fill: FUNNEL_COLORS[index] || "#10b981",
    }));

    const dropOffs = funnelSteps
      .slice(1)
      .map((step) => ({
        question: step.label,
        dropRate: `${step.dropOffFromPrevious}%`,
      }))
      .slice(0, 3);

    return {
      velocity: Array.from(velocityMap.entries()).map(([date, value]) => ({
        date,
        value,
      })),
      funnel,
      dropOffs,
    };
  }, [funnelSteps, leads]);

  return (
    <AdminContext.Provider
      value={{
        leads,
        loading,
        refreshLeads,
        updateLeadStatus,
        metrics,
        analytics,
        kpis,
        funnelSteps,
        auditEvents,
        filters,
        setFilters,
        role,
        helpMode,
        setHelpMode,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAdminData() {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error("useAdminData must be used within an AdminProvider");
  }
  return context;
}
