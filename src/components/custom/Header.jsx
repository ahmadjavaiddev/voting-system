import { SidebarTrigger } from "@/components/ui/sidebar";
import React from "react";

const Header = () => {
  return (
    <header className="sticky top-0 z-10 flex items-center justify-between border-b bg-background px-4 py-3 md:px-6">
      <div className="flex items-center gap-2">
        <SidebarTrigger />
        <h1 className="text-xl font-semibold">Dashboard</h1>
      </div>
    </header>
  );
};

export default Header;
