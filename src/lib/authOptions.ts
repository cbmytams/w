import type { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { DASHBOARD_ROLES, type DashboardRole } from "@/lib/rbac";
import { prisma } from "@/lib/db";
import bcrypt from "bcryptjs";
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

// Bcrypt hashes start with $2a$ / $2b$ / $2y$. If the env value isn't a hash,
// fall back to constant-time plaintext compare for backwards compatibility
// during rollout. Once all envs migrate to *_PASSWORD_HASH, the fallback can
// be removed.
async function verifyPassword(stored: string, input: string): Promise<boolean> {
  if (/^\$2[aby]\$/.test(stored)) {
    return bcrypt.compare(input, stored);
  }
  return safeCompare(stored, input);
}

type DashboardCredential = {
  storedPassword: string;
  role: DashboardRole;
  name: string;
};

type DashboardActor = Omit<DashboardCredential, "storedPassword">;

function getDashboardCredentials() {
  const credentials = new Map<string, DashboardCredential>();

  const register = (
    usernameVar: string,
    hashVar: string,
    legacyVar: string,
    role: DashboardRole,
    name: string
  ) => {
    const username = optionalEnv(usernameVar);
    const stored = optionalEnv(hashVar) ?? optionalEnv(legacyVar);
    if (username && stored) {
      credentials.set(username, { storedPassword: stored, role, name });
    }
  };

  register(
    "ADMIN_USERNAME",
    "ADMIN_PASSWORD_HASH",
    "ADMIN_PASSWORD",
    DASHBOARD_ROLES.ADMIN,
    "Admin"
  );
  register(
    "MANAGER_USERNAME",
    "MANAGER_PASSWORD_HASH",
    "MANAGER_PASSWORD",
    DASHBOARD_ROLES.MANAGER,
    "Manager"
  );
  register(
    "VIEWER_USERNAME",
    "VIEWER_PASSWORD_HASH",
    "VIEWER_PASSWORD",
    DASHBOARD_ROLES.VIEWER,
    "Viewer"
  );

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
        if (!user) return null;
        const ok = await verifyPassword(
          user.storedPassword,
          credentials.password
        );
        if (!ok) return null;

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
