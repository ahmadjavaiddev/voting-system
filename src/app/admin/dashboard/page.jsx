"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarClock, Clock, History } from "lucide-react";
import LiveElectionsTab from "@/components/general/LiveElections/LiveElectionsTab";
import UpcomingElectionsTab from "@/components/general/UpcomingElections/UpcomingElectionsTab";
import PreviousElectionsTab from "@/components/general/PreviousElections/PreviousElectionsTab";

export default function AdminDashboard() {
  return (
    <main className="container mx-auto p-4 md:p-6">
      <Tabs defaultValue="live" className="space-y-6">
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
