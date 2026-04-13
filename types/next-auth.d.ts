import type { DefaultSession } from "next-auth";
import type { DashboardRole } from "@/lib/rbac";

declare module "next-auth" {
  interface Session {
    user: DefaultSession["user"] & {
      id: string;
      role: DashboardRole;
      tenantId: string;
    };
  }

  interface User {
    id: string;
    role: DashboardRole;
    tenantId?: string;
  }
}
