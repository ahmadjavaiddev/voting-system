"use client";

import { useState } from "react";
import ElectionsList from "@/components/general/results/ElectionsList";
import SelectedElectionComponent from "@/components/general/results/SelectedElection";
import BackButton from "@/components/custom/BackButton";

export default function ElectionResultsDashboard() {
  const [liveElections, setLiveElections] = useState([]);
  const [selectedElection, setSelectedElection] = useState({});

  return (
    <div className="container mx-auto p-4 md:p-6 max-w-7xl">
      <BackButton />

      <div className="mb-6">
        <h1 className="text-2xl font-bold md:text-3xl">Election Results</h1>
        <p className="mt-1 text-muted-foreground">
          View live and historical election results
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <ElectionsList
          selectedElection={selectedElection}
          setSelectedElection={setSelectedElection}
          liveElections={liveElections}
          setLiveElections={setLiveElections}
        />
        {selectedElection?.candidates?.length >= 2 && (
          <SelectedElectionComponent
            selectedElection={selectedElection}
            setSelectedElection={setSelectedElection}
          />
        )}
      </div>
    </div>
  );
}
