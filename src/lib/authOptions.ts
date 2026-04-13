import type { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { DASHBOARD_ROLES, type DashboardRole } from "@/lib/rbac";
import { prisma } from "@/lib/db";
import { timingSafeEqual } from "crypto";

function optionalEnv(name: string) {
  return process.env[name]?.trim() || undefined;
}

function safeCompare(a: string, b: string): boolean {
  try {
    const bufA = Buffer.from(a, "utf8");
    const bufB = Buffer.from(b, "utf8");
    if (bufA.length !== bufB.length) return false;
    return timingSafeEqual(bufA, bufB);
  } catch {
    return false;
  }
}

type DashboardCredential = {
  password: string;
  role: DashboardRole;
  name: string;
};

type DashboardActor = Omit<DashboardCredential, "password">;

function getDashboardCredentials() {
  const credentials = new Map<string, DashboardCredential>();

  const adminUsername = optionalEnv("ADMIN_USERNAME");
  const adminPassword = optionalEnv("ADMIN_PASSWORD");

  if (adminUsername && adminPassword) {
    credentials.set(adminUsername, {
      password: adminPassword,
      role: DASHBOARD_ROLES.ADMIN,
      name: "Admin",
    });
  }

  const managerUsername = optionalEnv("MANAGER_USERNAME");
  const managerPassword = optionalEnv("MANAGER_PASSWORD");
  if (managerUsername && managerPassword) {
    credentials.set(managerUsername, {
      password: managerPassword,
      role: DASHBOARD_ROLES.MANAGER,
      name: "Manager",
    });
  }

  const viewerUsername = optionalEnv("VIEWER_USERNAME");
  const viewerPassword = optionalEnv("VIEWER_PASSWORD");
  if (viewerUsername && viewerPassword) {
    credentials.set(viewerUsername, {
      password: viewerPassword,
      role: DASHBOARD_ROLES.VIEWER,
      name: "Viewer",
    });
  }

  return credentials;
}

export function getConfiguredDashboardActors() {
  const actors = new Map<string, DashboardActor>();

  for (const [username, credential] of getDashboardCredentials()) {
    actors.set(username, { role: credential.role, name: credential.name });
  }

  return actors;
}

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) return null;

        const user = getDashboardCredentials().get(credentials.username);
        if (!user || !safeCompare(user.password, credentials.password))
          return null;

        return {
          id: credentials.username,
          name: user.name,
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      const nextToken = token as typeof token & { role?: DashboardRole };

      if (user) {
        const authUser = user as { id?: string; role?: DashboardRole };
        if (authUser.id) {
          nextToken.sub = authUser.id;
        }
        if (authUser.role) {
          nextToken.role = authUser.role;
        }
      }

      return nextToken;
    },
    async session({ session, token }) {
      if (session.user) {
        const sessionUser = session.user as typeof session.user & {
          id?: string;
          role?: DashboardRole;
          tenantId?: string;
        };

        if (token.sub) {
          sessionUser.id = token.sub;
        }

        if (typeof (token as { role?: string }).role === "string") {
          sessionUser.role = (token as { role: DashboardRole }).role;
        }

        if (token.sub) {
          const user = await prisma.user.findFirst({
            where: {
              email: token.sub,
              isActive: true,
            },
            select: {
              tenantId: true,
            },
          });
          if (user?.tenantId) {
            sessionUser.tenantId = user.tenantId;
          }
        }
      }

      return session;
    },
  },
  session: { strategy: "jwt" },
  pages: {
    signIn: "/admin/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
