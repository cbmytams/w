import type { Lead } from "../types";

const LOCAL_LEADS_KEY = "wafia_local_leads_v1";

const safeLocalStorage = () => {
  try {
    if (typeof window === "undefined") return null;
    return window.localStorage;
  } catch {
    return null;
  }
};

const SENSITIVE_KEY_PATTERN = /email|phone|mobile|name|prenom|nom|contact/i;

const sanitizeAnswers = (
  answers: Lead["answers"] | undefined
): Record<string, unknown> => {
  if (!answers) return {};
  return Object.entries(answers).reduce<Record<string, unknown>>(
    (acc, [key, value]) => {
      if (!SENSITIVE_KEY_PATTERN.test(key)) {
        acc[key] = value;
      }
      return acc;
    },
    {}
  );
};

const ensureLeadDefaults = (lead: Partial<Lead> & { id: string }): Lead => {
  return {
    id: lead.id,
    session_id: lead.session_id,
    name: "Anonymous",
    email: "",
    score: lead.score ?? 0,
    level: lead.level || "Unknown",
    date: lead.date || new Date().toISOString(),
    status: lead.status || "new",
    answers: sanitizeAnswers(lead.answers),
  };
};

export const getLocalLeads = (): Lead[] => {
  const storage = safeLocalStorage();
  if (!storage) return [];
  try {
    const raw = storage.getItem(LOCAL_LEADS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as Lead[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const saveLocalLeads = (leads: Lead[]) => {
  const storage = safeLocalStorage();
  if (!storage) return;
  storage.setItem(LOCAL_LEADS_KEY, JSON.stringify(leads));
  try {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event("wafia-local-leads-updated"));
    }
  } catch {
    // ignore
  }
};

export type LeadUpdate = Partial<Omit<Lead, "id">> & { id: string };

export const upsertLocalLead = (update: LeadUpdate): Lead[] => {
  const leads = getLocalLeads();
  const index = leads.findIndex(
    (lead) =>
      lead.id === update.id ||
      (update.session_id && lead.session_id === update.session_id)
  );

  const existing = index >= 0 ? leads[index] : undefined;
  const merged: Lead = ensureLeadDefaults({
    ...existing,
    ...update,
    answers: {
      ...(existing?.answers || {}),
      ...(update.answers || {}),
    },
    score: update.score ?? existing?.score,
    level: update.level ?? existing?.level,
    status: update.status ?? existing?.status,
    date: update.date ?? existing?.date,
  });

  if (index >= 0) {
    leads[index] = merged;
  } else {
    leads.unshift(merged);
  }

  saveLocalLeads(leads);
  return leads;
};

export const updateLocalLeadStatus = (
  id: string,
  status: Lead["status"]
): Lead[] => {
  const leads = getLocalLeads();
  const next = leads.map((lead) =>
    lead.id === id ? { ...lead, status } : lead
  );
  saveLocalLeads(next);
  return next;
};
