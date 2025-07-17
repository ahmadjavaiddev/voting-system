"use client";

import { useEffect, useState } from "react";
import ElectionsList from "@/components/general/results/ElectionsList";
import SelectedElectionComponent from "@/components/general/results/SelectedElection";
import BackButton from "@/components/custom/BackButton";
import { useRouter, useSearchParams } from "next/navigation";

function isMobile() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(max-width: 1024px)").matches; // Tailwind's lg breakpoint
}

const ResultsPage = ({ elections }) => {
  // Hooks
  const router = useRouter();
  const searchParams = useSearchParams();
  const electionId = searchParams.get("id");
  // States
  const [liveElections, setLiveElections] = useState([]);
  const [selectedElection, setSelectedElection] = useState({});

  useEffect(() => {
    if (elections) {
      setLiveElections(JSON.parse(elections));
    }
  }, [elections]);

  useEffect(() => {
    if (electionId && liveElections.length > 0) {
      const election = liveElections.find(
        (election) => election._id === electionId
      );
      if (election) {
        setSelectedElection(election);
        if (isMobile()) {
          // Scroll to the selected election if on mobile
          const element = document.getElementById(election._id);
          if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }
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
      <BackButton url="/dashboard" />

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
          isMobile={isMobile()}
        />
        {selectedElection?.candidates?.length >= 2 && (
          <SelectedElectionComponent selectedElection={selectedElection} />
        )}
      </div>
    </div>
  );
};

export default ResultsPage;
