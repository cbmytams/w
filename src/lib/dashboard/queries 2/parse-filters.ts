import type { DashboardFilters } from "../types";
import { normalizeRange } from "./utils";

const VALID_SOURCES: Array<NonNullable<DashboardFilters["source"]>> = [
    "questionnaire",
    "manual",
    "import",
];

function isValidDashboardSource(value: string): value is NonNullable<DashboardFilters["source"]> {
    return VALID_SOURCES.includes(value as NonNullable<DashboardFilters["source"]>);
}

export function parseDashboardFilters(searchParams: URLSearchParams): DashboardFilters {
    const normalized = normalizeRange(searchParams.get("from"), searchParams.get("to"));
    const typeParam = searchParams.get("type");
    const sourceParam = searchParams.get("source");

    return {
        from: normalized.from,
        to: normalized.to,
        source: sourceParam && isValidDashboardSource(sourceParam) ? sourceParam : undefined,
        segment: searchParams.get("segment") || undefined,
        owner: searchParams.get("owner") || undefined,
        status: searchParams.get("status") || undefined,
        type: (typeParam === "BRANDS" || typeParam === "TALENTS") ? typeParam : undefined
    };
}
