import type { DashboardFilters } from "../types";
import { normalizeRange } from "./utils";

export function parseDashboardFilters(searchParams: URLSearchParams): DashboardFilters {
    const normalized = normalizeRange(searchParams.get("from"), searchParams.get("to"));
    const typeParam = searchParams.get("type");
    return {
        from: normalized.from,
        to: normalized.to,
        source: (searchParams.get("source") as DashboardFilters["source"]) || undefined,
        segment: searchParams.get("segment") || undefined,
        owner: searchParams.get("owner") || undefined,
        status: searchParams.get("status") || undefined,
        type: (typeParam === "BRANDS" || typeParam === "TALENTS") ? typeParam : undefined
    };
}
