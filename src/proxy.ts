import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

function getRouteChecks(pathname: string) {
    const isApiAdmin = pathname.startsWith("/api/v1/admin") || pathname.startsWith("/api/v1/dashboard") || pathname.startsWith("/api/v1/questionnaires");
    const isAdminRoute = pathname.startsWith("/admin") && !pathname.startsWith("/admin/login");
    return { isApiAdmin, isAdminRoute };
}

export default withAuth(
    function middleware(req) {
        const { token } = req.nextauth;
        const { isApiAdmin, isAdminRoute } = getRouteChecks(req.nextUrl.pathname);

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
                const { isApiAdmin, isAdminRoute } = getRouteChecks(req.nextUrl.pathname);
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
