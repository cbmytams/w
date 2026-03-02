import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
    function middleware(req) {
        const { token } = req.nextauth;
        const isApiAdmin = req.nextUrl.pathname.startsWith("/api/v1/admin") || req.nextUrl.pathname.startsWith("/api/v1/dashboard") || req.nextUrl.pathname.startsWith("/api/v1/questionnaires");
        const isAdminRoute = req.nextUrl.pathname.startsWith("/admin") && !req.nextUrl.pathname.startsWith("/admin/login");

        if ((isAdminRoute || isApiAdmin) && token?.role !== "ADMIN") {
            if (req.nextUrl.pathname.startsWith("/api")) {
                return new NextResponse("Unauthorized", { status: 401 });
            }
            return NextResponse.redirect(new URL("/admin/login", req.url));
        }
    },
    {
        callbacks: {
            authorized: ({ req, token }) => {
                const isAdminRoute = req.nextUrl.pathname.startsWith("/admin") && !req.nextUrl.pathname.startsWith("/admin/login");
                const isApiAdmin = req.nextUrl.pathname.startsWith("/api/v1/admin") || req.nextUrl.pathname.startsWith("/api/v1/dashboard") || req.nextUrl.pathname.startsWith("/api/v1/questionnaires");
                if (isAdminRoute || isApiAdmin) {
                    return !!token;
                }
                return true;
            }
        },
        pages: {
            signIn: "/admin/login",
        }
    }
);

export const config = {
    matcher: ["/admin/:path*", "/api/v1/:path*"],
};
