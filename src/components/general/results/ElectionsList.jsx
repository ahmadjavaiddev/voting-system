"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import axios from "axios";
import { Badge, Clock } from "lucide-react";
import moment from "moment";
import React, { useEffect, useState } from "react";

const ElectionsList = ({
  selectedElection,
  setSelectedElection,
  liveElections,
  setLiveElections,
  calculatePercentage,
}) => {
  const [searchQuery, setSearchQuery] = useState("");

  // Handle election selection
  const handleElectionSelect = (election) => {
    setSelectedElection(election);
  };

  useEffect(() => {
    const getLiveElections = async () => {
      const response = await axios("/api/elections/results");
      setLiveElections(response.data.elections);
    };

    getLiveElections();
  }, []);

  return (
    <div className="lg:col-span-1 space-y-4">
      <h2 className="text-lg font-semibold mb-2">Live Elections</h2>

      {liveElections.length > 0 ? (
        liveElections.map((election) => {
          // Calculate total votes for this election
          const electionTotalVotes = election.candidates?.reduce(
            (acc, candidate) => acc + (candidate.votes || 0),
            0
          );
          return (
            <Card
              key={election._id}
              className={`cursor-pointer hover:border-primary transition-colors ${
                selectedElection?._id === election._id
                  ? "border-primary ring-1 ring-primary"
                  : ""
              }`}
              onClick={() => handleElectionSelect(election)}
            >
              <CardHeader className="p-4">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-base">{election.title}</CardTitle>
                  <Badge
                    variant="default"
                    className="bg-green-500 hover:bg-green-600"
                  >
                    Live
                  </Badge>
                </div>
                <CardDescription className="line-clamp-1">
                  {election.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Votes:</span>
                  <span className="font-medium">
                    {electionTotalVotes} / {election.eligibleVoters}
                  </span>
                </div>
                <Progress
                  value={calculatePercentage(
                    electionTotalVotes,
                    election.eligibleVoters
                  )}
                  className="h-2"
                />
                <div className="flex justify-between text-xs mt-1">
                  <span className="text-muted-foreground">
                    {calculatePercentage(
                      electionTotalVotes,
                      election.eligibleVoters
                    )}
                    % Turnout
                  </span>
                  <span className="text-muted-foreground">
                    {moment().isAfter(moment(election.endTime))
                      ? `Ended ${moment(election.endTime).fromNow()}`
                      : `Ends in ${moment(election.endTime).toNow(true)}`}
                  </span>
                </div>
              </CardContent>
            </Card>
          );
        })
      ) : (
        <div className="text-center p-8 bg-muted/30 rounded-lg">
          <Clock className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
          <h3 className="text-lg font-medium">No live elections found</h3>
          <p className="text-sm text-muted-foreground mt-1">
            {searchQuery
              ? "Try a different search term"
              : "Check back later for live elections"}
          </p>
        </div>
      )}
    </div>
  );
};

export default ElectionsList;
