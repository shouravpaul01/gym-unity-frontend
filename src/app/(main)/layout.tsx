import type { ReactNode } from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@heroui/navbar";
import { Button } from "@heroui/button";
import SidebarToggle from "./_components/SidebarTroggle";
import Sidebar from "./_components/Sidebar";
import Logout from "./_components/Logout";
import { getCurrentuser } from "@/src/services/auth";
 // client component

export default  async function DashboardLayout({ children }: { children: ReactNode }) {
  const user = await getCurrentuser();
  return (
    <div className="flex h-screen ">
      {/* Sidebar */}
     <Sidebar />

      {/* Main Content */}
      <div className="flex flex-1 flex-col">
        {/* Top Navbar */}
        <Navbar maxWidth="full" className="shadow">
          <NavbarBrand>
            <p className="font-bold text-inherit">GymUnity</p>
          </NavbarBrand>
          <NavbarContent justify="end">
            {/* Mobile sidebar toggle (client) */}
            <NavbarItem className="lg:hidden">
              <SidebarToggle />
            </NavbarItem>
            <NavbarItem>
              <Logout user={user as any} />
            </NavbarItem>
          </NavbarContent>
        </Navbar>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
