"use client";

import { useEffect, useState } from "react";
import ElectionsList from "@/components/general/results/ElectionsList";
import SelectedElectionComponent from "@/components/general/results/SelectedElection";
import BackButton from "@/components/custom/BackButton";
import { useRouter, useSearchParams } from "next/navigation";

const ResultsPage = ({ elections }) => {
  // Hooks
  const router = useRouter();
  const searchParams = useSearchParams();
  const electionId = searchParams.get("id");
  // States
  const [liveElections, setLiveElections] = useState([]);
  const [selectedElection, setSelectedElection] = useState({});
  const [totalCastVotes, setTotalCastVotes] = useState(0);

  useEffect(() => {
    if (elections) {
      setLiveElections(JSON.parse(elections));
    }
  }, [elections]);

  const calculatePercentage = (part, total) => {
    if (total === 0) return 0;
    return ((part / total) * 100).toFixed(2);
  };

  useEffect(() => {
    if (electionId && liveElections.length > 0) {
      const election = liveElections.find(
        (election) => election._id === electionId
      );
      if (election) {
        setSelectedElection(election);
        const votes = election?.candidates?.reduce(
          (acc, candidate) => acc + candidate.votes,
          0
        );
        setTotalCastVotes(votes);
      }
    }
  }, [liveElections.length, electionId]);

  useEffect(() => {
    if (selectedElection?._id) {
      const url = new URL(window.location.href);
      url.searchParams.set("id", selectedElection?._id);
      router.replace(url.toString(), { scroll: false });
    }
  }, [selectedElection?._id]);

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
          totalCastVotes={totalCastVotes}
          selectedElection={selectedElection}
          setSelectedElection={setSelectedElection}
          liveElections={liveElections}
          setLiveElections={setLiveElections}
          calculatePercentage={calculatePercentage}
        />
        {selectedElection?.candidates?.length >= 2 && (
          <SelectedElectionComponent
            totalCastVotes={totalCastVotes}
            selectedElection={selectedElection}
            setSelectedElection={setSelectedElection}
            calculatePercentage={calculatePercentage}
          />
        )}
      </div>
    </div>
  );
};

export default ResultsPage;
