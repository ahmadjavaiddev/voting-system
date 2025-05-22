"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarClock, Clock, History } from "lucide-react";
import LiveElectionsTab from "@/components/general/LiveElections/LiveElectionsTab";
import UpcomingElectionsTab from "@/components/general/UpcomingElections/UpcomingElectionsTab";
import PreviousElectionsTab from "@/components/general/PreviousElections/PreviousElectionsTab";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

export default function AdminDashboard() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab");
  const validTabs = ["live", "upcoming", "previous"];
  const initialTab = validTabs.includes(tabParam) ? tabParam : "live";
  const [activeTab, setActiveTab] = useState(initialTab);

  // Keep tab in sync with URL changes
  useMemo(() => {
    if (validTabs.includes(tabParam) && tabParam !== activeTab) {
      setActiveTab(tabParam);
    }
  }, [tabParam]);

  useEffect(() => {
    const url = new URL(window.location.href);
    url.searchParams.set('tab', activeTab);
    router.replace(url.toString(), { scroll: false });
  }, [activeTab, router]);

  return (
    <main className="container mx-auto p-4 md:p-6">
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-6"
      >
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="live" className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span>Live Elections</span>
          </TabsTrigger>
          <TabsTrigger value="upcoming" className="flex items-center gap-2">
            <CalendarClock className="h-4 w-4" />
            <span>Upcoming</span>
          </TabsTrigger>
          <TabsTrigger value="previous" className="flex items-center gap-2">
            <History className="h-4 w-4" />
            <span>Previous</span>
          </TabsTrigger>
        </TabsList>

        {/* Live Elections */}
        <TabsContent value="live" className="space-y-6">
          <LiveElectionsTab isAdmin={true} />
        </TabsContent>

        {/* Upcoming Elections */}
        <TabsContent value="upcoming" className="space-y-6">
          <UpcomingElectionsTab isAdmin={true} />
        </TabsContent>

        {/* Previous Elections */}
        <TabsContent value="previous" className="space-y-6">
          <PreviousElectionsTab isAdmin={true} />
        </TabsContent>
      </Tabs>
    </main>
  );
}
