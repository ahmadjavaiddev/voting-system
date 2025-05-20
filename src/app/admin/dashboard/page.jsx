"use client";
import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarClock, Clock, History } from "lucide-react";
import LiveElectionCard from "@/components/general/LiveElectionCard";
import UpcomingElectionCard from "@/components/general/UpcomingElectionCard";
import PreviousElectionCard from "@/components/general/PreviousElectionCard";
import axios from "axios";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AdminDashboard() {
  const [liveElections, setLiveElections] = useState([]);
  const [upcomingElections, setUpcomingElections] = useState([]);
  const [historyElections, setHistoryElections] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchLiveElectionsData = async () => {
    try {
      const response = await axios("/api/elections/live");
      setLiveElections(response?.data?.elections || []);
    } catch (error) {
      console.log("Error while Fetching the live Data ::", error.message);
    }
  };
  const fetchUpcomingElectionsData = async () => {
    try {
      const response = await axios("/api/elections/upcoming");
      setUpcomingElections(response?.data?.elections || []);
    } catch (error) {
      console.log("Error while Fetching the upcoming Data ::", error.message);
    }
  };
  const fetchPreviousElectionsData = async () => {
    try {
      const response = await axios("/api/elections/previous");
      setHistoryElections(response?.data?.elections || []);
    } catch (error) {
      console.log("Error while Fetching the previous Data ::", error.message);
    }
  };

  useEffect(() => {
    fetchLiveElectionsData();
    fetchUpcomingElectionsData();
    fetchPreviousElectionsData();
  }, []);

  return (
    <main className="container mx-auto p-4 md:p-6">
      {/* Create Election Button and Modal */}
      <Link href="/admin/election/create">
        <Button className="mb-6">Create Election</Button>
      </Link>

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
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {liveElections?.length > 0 ? (
              liveElections?.map((election) => (
                <div key={election._id} className="relative">
                  <LiveElectionCard election={election} isAdmin={true} />
                  <Button size="sm" className="absolute top-2 right-2">
                    View Results
                  </Button>
                </div>
              ))
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
                <div className="rounded-full bg-muted p-3">
                  <Clock className="h-6 w-6 text-muted-foreground" />
                </div>
                <h3 className="mt-4 text-lg font-medium">
                  No live elections found
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {searchQuery
                    ? "Try a different search term"
                    : "Check back later for live elections"}
                </p>
              </div>
            )}
          </div>
        </TabsContent>

        {/* Upcoming Elections */}
        <TabsContent value="upcoming" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {upcomingElections.length > 0 ? (
              upcomingElections?.map((election) => (
                <UpcomingElectionCard election={election} key={election._id} />
              ))
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
                <div className="rounded-full bg-muted p-3">
                  <CalendarClock className="h-6 w-6 text-muted-foreground" />
                </div>
                <h3 className="mt-4 text-lg font-medium">
                  No upcoming elections found
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {searchQuery
                    ? "Try a different search term"
                    : "Check back later for upcoming elections"}
                </p>
              </div>
            )}
          </div>
        </TabsContent>

        {/* Previous Elections */}
        <TabsContent value="previous" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {historyElections?.length > 0 ? (
              historyElections?.map((election) => (
                <div key={election._id} className="relative">
                  <PreviousElectionCard election={election} isAdmin={true} />
                </div>
              ))
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
                <div className="rounded-full bg-muted p-3">
                  <History className="h-6 w-6 text-muted-foreground" />
                </div>
                <h3 className="mt-4 text-lg font-medium">
                  No previous elections found
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {searchQuery
                    ? "Try a different search term"
                    : "Your election history will appear here"}
                </p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </main>
  );
}
