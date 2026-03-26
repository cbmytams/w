import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import { canAccessDashboardRole, DASHBOARD_ROLES, type DashboardRole } from "@/lib/rbac";

export function getRouteChecks(pathname: string) {
    const isQuestionnaireAdminApi =
        pathname.startsWith("/api/v1/questionnaires") &&
        pathname !== "/api/v1/questionnaires/current" &&
        pathname !== "/api/v1/questionnaires/submit";
    const isApiAdmin =
        pathname.startsWith("/api/v1/admin") ||
        pathname.startsWith("/api/v1/dashboard") ||
        isQuestionnaireAdminApi;
    const isAdminRoute = pathname.startsWith("/admin") && !pathname.startsWith("/admin/login");
    return { isApiAdmin, isAdminRoute };
}

export default withAuth(
    function middleware(req) {
        const { token } = req.nextauth;
        const { isApiAdmin, isAdminRoute } = getRouteChecks(req.nextUrl.pathname);
        const role = typeof token?.role === "string" ? token.role : null;
        const hasDashboardAccess = role
            ? canAccessDashboardRole(role as DashboardRole, DASHBOARD_ROLES.VIEWER)
            : false;

        if ((isAdminRoute || isApiAdmin) && !hasDashboardAccess) {
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
