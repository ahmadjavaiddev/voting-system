"use client";
import ElectionHeader from "@/components/general/election-details/ElectionHeader";
import { Button } from "@/components/ui/button";
import LeftColumn from "@/components/general/election-details/LeftColumn";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import RightColumn from "@/components/general/election-details/RightColumn";

const ElectionDetails = () => {
  const router = useRouter();

  return (
    <div className="container mx-auto p-4 md:p-6 max-w-5xl">
      <Button
        variant="ghost"
        size="sm"
        className="mb-4 flex items-center gap-1 text-muted-foreground"
        onClick={() => router.push("/user/dashboard")}
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Dashboard
      </Button>
      <ElectionHeader />
      <div className="grid gap-6 md:grid-cols-3">
        <LeftColumn />
        <RightColumn />
      </div>
    </div>
  );
};

export default ElectionDetails;
