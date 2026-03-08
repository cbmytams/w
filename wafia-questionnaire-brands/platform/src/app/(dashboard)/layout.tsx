import type { ReactNode } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Sidebar } from "@/components/layout/Sidebar";
import { TopBar } from "@/components/layout/TopBar";
import { ADMIN_SESSION_COOKIE, verifyAdminSessionToken } from "@/lib/authSession";

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;
  const session = token ? verifyAdminSessionToken(token) : null;

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="app-shell flex">
      <Sidebar />
      <div className="flex-1 px-6 lg:px-12">
        <div className="app-container">
          <TopBar />
          <div className="pb-16">{children}</div>
        </div>
      </div>
    </div>
  );
}
