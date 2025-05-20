import React, { useEffect, useState } from "react";
import LiveElectionCard from "./LiveElectionCard";
import { Clock } from "lucide-react";
import axios from "axios";

const LiveElectionsTab = ({ isAdmin }) => {
  const [liveElections, setLiveElections] = useState([]);

  useEffect(() => {
    const fetchLiveElectionsData = async () => {
      try {
        const response = await axios("/api/elections/live");
        setLiveElections(response?.data?.elections || []);
      } catch (error) {
        console.error("Error :: LiveElectionsTab ::", error.message);
      }
    };
    fetchLiveElectionsData();
  }, []);

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {liveElections?.length > 0 ? (
        liveElections?.map((election) => (
          <div key={election._id} className="relative">
            <LiveElectionCard election={election} isAdmin={isAdmin} />
          </div>
        ))
      ) : (
        <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
          <div className="rounded-full bg-muted p-3">
            <Clock className="h-6 w-6 text-muted-foreground" />
          </div>
          <h3 className="mt-4 text-lg font-medium">No live elections found</h3>
        </div>
      )}
    </div>
  );
};

export default LiveElectionsTab;
