import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import moment from "moment";
import React from "react";

const ElectionsList = ({
  selectedElection,
  setSelectedElection,
  liveElections,
  calculatePercentage,
}) => {
  // Handle election selection
  const handleElectionSelect = (election) => {
    setSelectedElection(election);
  };

  return (
    <div className="lg:col-span-1 space-y-4">
      <h2 className="text-lg font-semibold mb-2">Live Elections</h2>

      {liveElections.length > 0 &&
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
                selectedElection?._id === election._id ? "border-gray-600" : ""
              }`}
              onClick={() => handleElectionSelect(election)}
            >
              <CardHeader className="px-4">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-base">{election.title}</CardTitle>
                  {moment().isAfter(moment(election.endTime)) ? (
                    <Badge
                      variant="default"
                      className="bg-red-500 hover:bg-red-600"
                    >
                      Ended
                    </Badge>
                  ) : (
                    <Badge
                      variant="default"
                      className="bg-green-500 hover:bg-green-600"
                    >
                      Live
                    </Badge>
                  )}
                </div>
                <CardDescription className="line-clamp-1">
                  {election.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="px-4 pt-0">
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
        })}
    </div>
  );
};

export default ElectionsList;
