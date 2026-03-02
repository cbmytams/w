import type { ReactNode } from "react";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { Sidebar } from "@/components/layout/Sidebar";
import { TopBar } from "@/components/layout/TopBar";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/admin/login");
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
