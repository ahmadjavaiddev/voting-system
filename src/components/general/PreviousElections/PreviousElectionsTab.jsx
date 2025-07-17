"use client";

import React, { useState, useEffect } from "react";
import { History } from "lucide-react";
import axios from "axios";
import PreviousElectionCard from "./PreviousElectionCard";

const PreviousElectionsTab = () => {
  const [previousElections, setPreviousElections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPreviousElectionsData = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/api/elections/previous");
        setPreviousElections(response?.data?.elections || []);
      } catch (error) {
        console.error("Error :: PreviousElectionsTab ::", error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPreviousElectionsData();
  }, []);

  if (loading) {
    return (
      <div className="col-span-full flex items-center justify-center py-12 text-center gap-4">
        <div className="h-8 w-8 rounded-full border-4 border-gray-300 border-t-blue-500 animate-spin"></div>
        <h3 className="text-lg font-medium text-gray-700 dark:text-gray-200">
          Loading Previous Elections...
        </h3>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {previousElections?.length > 0 ? (
        previousElections?.map((election) => (
          <div key={election._id} className="relative">
            <PreviousElectionCard election={election} />
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
