"use client";
import ElectionHeader from "@/components/general/election-details/ElectionHeader";
import { Button } from "@/components/ui/button";
import LeftColumn from "@/components/general/election-details/LeftColumn";
import { ArrowLeft } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import RightColumn from "@/components/general/election-details/RightColumn";
import axiosInstance from "@/lib/axios";
import moment from "moment";

const ElectionDetails = () => {
  const router = useRouter();
  const electionId = useParams().id;
  const [electionData, setElectionData] = useState({});

  useEffect(() => {
    (async () => {
      const response = await axiosInstance.get(`/api/elections/${electionId}`);
      setElectionData({
        ...response.data.election,
        rules: [
          "Each student may cast one vote only",
          "Voting requires valid student ID verification",
          "Results will be announced within 24 hours of election close",
          "Any disputes must be filed within 48 hours of results announcement",
        ],
        description:
          "Annual election for the Student Council representatives who will serve for the 2025-2026 academic year. The elected council will be responsible for organizing student events, representing student interests to the administration, and managing the student activity budget.",
        totalVotes: 50,
        eligibleVoters: 101,
        startTime: "2024-06-01T09:00:00Z",
        endTime: "2024-06-02T09:00:00Z",
        candidates: [
          {
            id: 1,
            color: "bg-green-500",
            name: "Progress Party",
            votes: 30,
            slogan: "Building a Better Tomorrow",
            members: [
              "Alex Johnson (President)",
              "Maria Garcia (Vice President)",
              "David Kim (Treasurer)",
            ],
            platform: [
              "Increase student activity funding by 15%",
              "Create more study spaces across campus",
              "Implement monthly town halls with administration",
              "Expand mental health resources",
            ],
          },
          {
            id: 2,
            color: "bg-red-500",
            name: "Congress Party",
            votes: 20,
            slogan: "Building a Better Tomorrow",
            members: [
              "Alex Johnson (President)",
              "Maria Garcia (Vice President)",
              "David Kim (Treasurer)",
            ],
            platform: [
              "Increase student activity funding by 15%",
              "Create more study spaces across campus",
              "Implement monthly town halls with administration",
              "Expand mental health resources",
            ],
          },
        ],
      });
    })();
  }, []);

  return (
    <div className="container mx-auto p-4 md:p-6 max-w-5xl">
      {(() => {
        const now = moment();
        const start = moment(electionData.startTime);
        const end = moment(electionData.endTime);
        if (!electionData.startTime || !electionData.endTime) return null;
        if (now.isBefore(start)) {
          return (
            <div className="mb-4 text-blue-500 font-semibold">
              Election starts {start.fromNow()} (at {start.format("LLL")})
            </div>
          );
        } else if (now.isAfter(end)) {
          return (
            <div className="mb-4 text-red-500 font-semibold">
              Election Ended {end.fromNow()} (ended at {end.format("LLL")})
            </div>
          );
        } else {
          return (
            <div className="mb-4 text-green-600 font-semibold">
              Time Remaining: {end.toNow(true)} (ends at {end.format("LLL")})
            </div>
          );
        }
      })()}
      <Button
        variant="ghost"
        size="sm"
        className="mb-4 flex items-center gap-1 text-muted-foreground"
        onClick={() => router.push("/user/dashboard")}
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Dashboard
      </Button>
      <ElectionHeader election={electionData} />
      <div className="grid gap-6 md:grid-cols-3">
        <LeftColumn election={electionData} />
        <RightColumn election={electionData} />
      </div>
    </div>
  );
};

export default ElectionDetails;
