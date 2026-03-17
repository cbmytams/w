import type { Metadata } from "next";
import type { ReactNode } from "react";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import "@/app/questionnaire/questionnaire.css";
import { Sidebar } from "@/components/layout/Sidebar";
import { TopBar } from "@/components/layout/TopBar";
import { AdminProviders } from "@/components/layout/AdminProviders";
import { authOptions } from "@/lib/authOptions";

export const metadata: Metadata = {
  title: "Admin",
  description: "Espace d'administration Wafia.",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/admin/login");
  }

  return (
    <div className="relative min-h-screen text-white bg-black selection:bg-orange-500/30 selection:text-white flex overflow-hidden">
      {/* Background Ambience */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-pink-500/10 rounded-full blur-[120px] mix-blend-screen" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-orange-500/10 rounded-full blur-[120px] mix-blend-screen" />
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:24px_24px] mix-blend-overlay" />
      </div>

      <div className="relative z-10 flex w-full h-screen overflow-hidden">
        <Sidebar />
        <main id="main-content" className="flex-1 overflow-y-auto custom-scrollbar relative">
          <div className="px-6 lg:px-12 max-w-[1600px] mx-auto min-h-full flex flex-col pt-6 pb-20">
            <AdminProviders>
              <TopBar />
              <div className="flex-1 mt-8">{children}</div>
            </AdminProviders>
          </div>
        </main>
      </div>
    </div>
  );
}
