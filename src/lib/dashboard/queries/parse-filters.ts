import type { DashboardFilters } from "../types";
import { normalizeRange } from "./utils";

export function parseDashboardFilters(searchParams: URLSearchParams): DashboardFilters {
    const normalized = normalizeRange(searchParams.get("from"), searchParams.get("to"));
    const sourceParam = searchParams.get("source");
    const typeParam = searchParams.get("type");
    const source =
        sourceParam === "questionnaire" ||
        sourceParam === "manual" ||
        sourceParam === "import"
            ? sourceParam
            : undefined;

    return {
        from: normalized.from,
        to: normalized.to,
        source,
        segment: searchParams.get("segment") || undefined,
        owner: searchParams.get("owner") || undefined,
        status: searchParams.get("status") || undefined,
        type: (typeParam === "BRANDS" || typeParam === "TALENTS") ? typeParam : undefined
    };
}
