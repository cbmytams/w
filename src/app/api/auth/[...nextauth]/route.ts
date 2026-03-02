import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import { AuthOptions } from "next-auth";

export const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.username || !credentials?.password) return null;

                const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "admin";
                const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin";

                if (
                    credentials.username === ADMIN_USERNAME &&
                    credentials.password === ADMIN_PASSWORD
                ) {
                    return { id: "1", name: "Admin", role: "ADMIN" };
                }
                return null;
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                // @ts-ignore
                token.role = user.role;
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                // @ts-ignore
                session.user.role = token.role;
            }
            return session;
        }
    },
    session: { strategy: "jwt" },
    pages: {
        signIn: "/admin/login",
    },
    secret: process.env.NEXTAUTH_SECRET || "default-secret-for-dev",
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
