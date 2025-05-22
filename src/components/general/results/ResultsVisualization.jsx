import React from "react";
import { Progress } from "@/components/ui/progress";

const ResultsVisualization = ({ selectedElection, calculatePercentage }) => {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Current Results</h3>
      <div className="space-y-6">
        {selectedElection?.candidates?.map((candidate) => (
          <div key={candidate._id} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img
                  src={candidate.image}
                  alt={candidate.name}
                  className="rounded-full h-10 w-10 object-cover border border-muted/30 shadow-sm shadow-muted/20"
                />
                <span className="font-medium">{candidate.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-semibold">
                  {calculatePercentage(
                    candidate.votes,
                    selectedElection.eligibleVoters || 1500
                  )}
                  %
                </span>
                <span className="text-sm text-muted-foreground">
                  ({candidate.votes} votes)
                </span>
              </div>
            </div>
            <div className="relative pt-1">
              <div className="flex mb-2 items-center justify-between">
                <div>
                  <span
                    className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-white"
                    style={{ backgroundColor: candidate.color }}
                  >
                    {candidate.slogan}
                  </span>
                </div>
              </div>
              {/* Progress with custom indicator color */}
              <div className="relative">
                <Progress
                  value={calculatePercentage(
                    candidate.votes,
                    selectedElection.eligibleVoters
                  )}
                  className="h-4"
                  indicatorClassName={`bg-[${candidate.color}]`}
                />
                <span>{candidate.color}</span>
              </div>
              {calculatePercentage(
                candidate.votes,
                selectedElection.totalVotes
              ) > 10 && (
                <span className="px-2 font-semibold text-teal-600 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  {calculatePercentage(
                    candidate.votes,
                    selectedElection.totalVotes
                  )}
                  %
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResultsVisualization;
