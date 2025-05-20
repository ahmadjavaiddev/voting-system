import React, { useEffect, useState } from "react";
import { History } from "lucide-react";
import axios from "axios";
import PreviousElectionCard from "./PreviousElectionCard";

const PreviousElectionsTab = ({ isAdmin }) => {
  const [previousElections, setPreviousElections] = useState([]);

  useEffect(() => {
    const fetchPreviousElectionsData = async () => {
      try {
        const response = await axios("/api/elections/previous");
        setPreviousElections(response?.data?.elections || []);
      } catch (error) {
        console.error("Error :: PreviousElectionsTab ::", error.message);
      }
    };
    fetchPreviousElectionsData();
  }, []);

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {previousElections?.length > 0 ? (
        previousElections?.map((election) => (
          <div key={election._id} className="relative">
            <PreviousElectionCard election={election} isAdmin={isAdmin} />
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
        </div>
      )}
    </div>
  );
};

export default PreviousElectionsTab;
