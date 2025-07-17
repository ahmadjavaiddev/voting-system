import React, { useEffect, useState } from "react";
import LiveElectionCard from "./LiveElectionCard";
import { Clock } from "lucide-react";
import axios from "axios";

const LiveElectionsTab = () => {
  const [liveElections, setLiveElections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLiveElectionsData = async () => {
      try {
        setLoading(true);
        const response = await axios("/api/elections/live");
        setLiveElections(response?.data?.elections || []);
      } catch (error) {
        console.error("Error :: LiveElectionsTab ::", error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchLiveElectionsData();
  }, []);

  if (loading) {
    return (
      <div className="col-span-full flex items-center justify-center py-12 text-center gap-4">
        <div className="h-8 w-8 rounded-full border-4 border-gray-300 border-t-blue-500 animate-spin"></div>
        <h3 className="md:text-lg font-medium text-gray-700 dark:text-gray-200">
          Loading Live Elections...
        </h3>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {liveElections?.length > 0 ? (
        liveElections?.map((election) => (
          <div key={election._id} className="relative">
            <LiveElectionCard election={election} />
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
