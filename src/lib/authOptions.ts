import type { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

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

        const adminUsername = process.env.ADMIN_USERNAME || "admin";
        const adminPassword = process.env.ADMIN_PASSWORD || "admin";

        if (
          credentials.username === adminUsername &&
          credentials.password === adminPassword
        ) {
          return { id: "1", name: "Admin", role: "ADMIN" };
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        // @ts-expect-error - Expected for Custom JWT
        token.role = user.role;
      }

      return token;
    },
    async session({ session, token }) {
      if (token) {
        // @ts-expect-error - Expected for Custom Session
        session.user.role = token.role;
      }

      return session;
    },
  },
  session: { strategy: "jwt" },
  pages: {
    signIn: "/admin/login",
  },
  secret: process.env.NEXTAUTH_SECRET || "default-secret-for-dev",
};
