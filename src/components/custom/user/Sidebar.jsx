import React from "react";
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
  BarChart2,
  CalendarCheck2,
  History,
  ListVideo,
  Settings,
  Trophy,
  Vote,
} from "lucide-react";
import Link from "next/link";

const UserSidebar = () => {
  return (
    <Sidebar>
      {/* Sidebar */}
      <SidebarHeader className="border-b">
        <div className="flex items-center gap-2 px-2 py-3">
          <Vote className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold">ElectionsHub</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive>
              <Link href="/user/dashboard">
                <Trophy />
                <span>Dashboard</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/user/dashboard?tab=live">
                <ListVideo />
                <span>Live Elections</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/user/dashboard?tab=upcoming">
                <CalendarCheck2 />
                <span>Upcoming Elections</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/user/dashboard?tab=previous">
                <History />
                <span>Previous Elections</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/user/election/results">
                <BarChart2 />
                <span>Results</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/user/settings">
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
            JD
          </div>
          <div>
            <p className="text-sm font-medium">John Doe</p>
            <p className="text-xs text-muted-foreground">
              john.doe@example.com
            </p>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default UserSidebar;
