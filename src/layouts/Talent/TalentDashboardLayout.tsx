import { Outlet } from "react-router-dom";

import talentNavItems from "../../data/talentNavItems";
import Sidebar from "./Sidebar";

import {
  SidebarProvider,
  SidebarInset,
} from "../../components/ui/sidebar";

export default function TalentDashboardLayout() {
  return (
    <SidebarProvider>
      <Sidebar navItems={talentNavItems} />

      <SidebarInset className="min-w-0 flex-1 bg-white">
        <main className="min-h-screen w-full">
          <div className="mx-auto w-full max-w-[1300px] px-6 py-6 sm:px-8 lg:px-10 xl:px-12">
            <Outlet />
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}