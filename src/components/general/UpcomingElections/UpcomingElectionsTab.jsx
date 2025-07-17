import React, { useEffect, useState } from "react";
import { CalendarClock } from "lucide-react";
import axios from "axios";
import UpcomingElectionCard from "./UpcomingElectionCard";

const UpcomingElectionsTab = () => {
  const [upcomingElections, setUpcomingElections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUpcomingElectionsData = async () => {
      try {
        setLoading(true);
        const response = await axios("/api/elections/upcoming");
        setUpcomingElections(response?.data?.elections || []);
      } catch (error) {
        console.error("Error :: UpcomingElectionsTab ::", error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUpcomingElectionsData();
  }, []);

  if (loading) {
    return (
      <div className="col-span-full flex items-center justify-center py-12 text-center gap-4">
        <div className="h-8 w-8 rounded-full border-4 border-gray-300 border-t-blue-500 animate-spin"></div>
        <h3 className="text-lg font-medium text-gray-700 dark:text-gray-200">
          Loading Upcoming Elections...
        </h3>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {upcomingElections?.length > 0 ? (
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
        </div>
      )}
    </div>
  );
};

export default UpcomingElectionsTab;
