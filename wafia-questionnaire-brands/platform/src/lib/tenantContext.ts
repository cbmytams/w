import type { AdminSession } from "./authSession";
import { resolveTenantIdForSession } from "./tenant";
import { jsonApiError } from "./apiError";

type TenantContextResult =
  | { tenantId: string; response: null }
  | { tenantId: null; response: Response };

export async function requireTenantContext(
  session: AdminSession
): Promise<TenantContextResult> {
  const tenantId = await resolveTenantIdForSession(session.tenantSlug);
  if (!tenantId) {
    return {
      tenantId: null,
      response: jsonApiError("TENANT_MISCONFIGURED", "Tenant misconfigured", {
        status: 503,
      }),
    };
  }

  return { tenantId, response: null };
}
