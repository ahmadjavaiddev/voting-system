import React from "react";
import Link from "next/link";
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from "@/components/ui/sidebar";
import {
  CalendarCheck2,
  History,
  Trophy,
  Settings,
  BarChart2,
  PlusCircle,
  ListVideo,
} from "lucide-react";
import RoleGuard from "../RoleGaurd";

const AdminSidebar = async () => {
  return (
    <Sidebar>
      {/* Sidebar */}
      <SidebarHeader className="border-b">
        <div className="flex items-center gap-2 px-2 py-3">
          <Trophy className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold">Dashboard</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive>
              <Link href="/dashboard">
                <Trophy />
                <span>Dashboard</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <RoleGuard allowedRoles={["admin"]} redirect={false}>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href="/election/create">
                  <PlusCircle />
                  <span>Create Election</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </RoleGuard>

          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/dashboard?tab=live">
                <ListVideo />
                <span>Live Elections</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/dashboard?tab=upcoming">
                <CalendarCheck2 />
                <span>Upcoming Elections</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/dashboard?tab=previous">
                <History />
                <span>Previous Elections</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/election/results">
                <BarChart2 />
                <span>Results</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/settings">
                <Settings />
                <span>Settings</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="border-t p-4">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-medium">
            AD
          </div>
          <div>
            <p className="text-sm font-medium">Admin User</p>
            <p className="text-xs text-muted-foreground">admin@example.com</p>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AdminSidebar;
