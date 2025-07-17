"use client";
import ElectionHeader from "@/components/general/election-details/ElectionHeader";
import LeftColumn from "@/components/general/election-details/LeftColumn";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import RightColumn from "@/components/general/election-details/RightColumn";
import axiosInstance from "@/lib/axios";
import ElectionDetailsLoading from "@/components/general/loadings/ElectionDetailsLoading";
import BackButton from "@/components/custom/BackButton";

const ElectionDetails = () => {
  const electionId = useParams().id;
  const [electionData, setElectionData] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchElectionData = async () => {
    try {
      const response = await axiosInstance.get(`/api/elections/${electionId}`);
      setElectionData(response.data.election);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching election data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchElectionData();
  }, [electionId]);

  if (loading) {
    return <ElectionDetailsLoading />;
  }

  return (
    <div className="container mx-auto p-4 md:p-6 max-w-6xl">
      <BackButton url="/dashboard" />
      <ElectionHeader election={electionData} />
      <div className="grid gap-6 md:grid-cols-3">
        <LeftColumn election={electionData} />
        <RightColumn election={electionData} onVoteSuccess={fetchElectionData} />
      </div>
    </div>
  );
};

export default ElectionDetails;
