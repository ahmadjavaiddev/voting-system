"use client";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import React, { useState } from "react";

const UserHeader = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // Filter elections based on search query
  const filterElections = (elections) => {
    if (!searchQuery) return elections;
    return [].filter(
      (election) =>
        election.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        election.parties.some((party) =>
          party.toLowerCase().includes(searchQuery.toLowerCase())
        )
    );
  };
  return (
    <header className="sticky top-0 z-10 flex items-center justify-between border-b bg-background px-4 py-3 md:px-6">
      <div className="flex items-center gap-2">
        <SidebarTrigger />
        <h1 className="text-xl font-semibold">Elections Dashboard</h1>
      </div>
      <div className="relative w-full max-w-sm">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search elections..."
          className="w-full rounded-md pl-8"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
    </header>
  );
};

export default UserHeader;
