import { prisma } from "./db";

export async function resolveTenantIdForSession(tenantSlug?: string | null) {
  if (!tenantSlug) return null;

  const bySlug = await prisma.tenant.findUnique({
    where: { slug: tenantSlug },
    select: { id: true },
  });

  return bySlug?.id ?? null;
}
