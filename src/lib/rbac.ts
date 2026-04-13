export const PLATFORM_ROLES = {
  SUPER_ADMIN: "SUPER_ADMIN",
  ADMIN: "ADMIN",
  STAFF: "STAFF",
  TALENT: "TALENT",
} as const;

export type PlatformRole = (typeof PLATFORM_ROLES)[keyof typeof PLATFORM_ROLES];

export const DASHBOARD_ROLES = {
  ADMIN: "ADMIN",
  MANAGER: "MANAGER",
  VIEWER: "VIEWER",
} as const;

export type DashboardRole =
  (typeof DASHBOARD_ROLES)[keyof typeof DASHBOARD_ROLES];

const DASHBOARD_ROLE_RANK: Record<DashboardRole, number> = {
  ADMIN: 3,
  MANAGER: 2,
  VIEWER: 1,
};

export function canAccessDashboardRole(
  current: DashboardRole,
  required: DashboardRole
) {
  return DASHBOARD_ROLE_RANK[current] >= DASHBOARD_ROLE_RANK[required];
}

export function mapPlatformRoleToDashboardRole(
  role?: string | null
): DashboardRole {
  switch (role) {
    case PLATFORM_ROLES.SUPER_ADMIN:
    case PLATFORM_ROLES.ADMIN:
      return DASHBOARD_ROLES.ADMIN;
    case PLATFORM_ROLES.STAFF:
      return DASHBOARD_ROLES.MANAGER;
    default:
      return DASHBOARD_ROLES.VIEWER;
  }
}
