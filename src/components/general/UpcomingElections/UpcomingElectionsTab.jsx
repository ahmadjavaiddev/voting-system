import React, { useEffect, useState } from "react";
import { CalendarClock } from "lucide-react";
import axios from "axios";
import UpcomingElectionCard from "./UpcomingElectionCard";

const UpcomingElectionsTab = () => {
  const [upcomingElections, setUpcomingElections] = useState([]);

  useEffect(() => {
    const fetchUpcomingElectionsData = async () => {
      try {
        const response = await axios("/api/elections/upcoming");
        setUpcomingElections(response?.data?.elections || []);
      } catch (error) {
        console.error("Error :: UpcomingElectionsTab ::", error.message);
      }
    };
    fetchUpcomingElectionsData();
  }, []);

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
