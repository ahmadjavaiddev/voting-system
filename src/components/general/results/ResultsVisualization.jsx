import React from "react";
import { getTotalCastVotes } from "@/lib/index";

const ResultsVisualization = ({ selectedElection }) => {
  function calculatePercentage(candidate) {
    const value = candidate.votes || 0;
    const total = getTotalCastVotes(selectedElection);

    if (total === 0) return 0;
    return Math.round((value / total) * 100);
  }

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Current Results</h3>
      <div className="space-y-6">
        {selectedElection?.candidates?.map((candidate) => (
          <div
            key={candidate._id}
            className="space-y-2 shadow-sm p-4 bg-muted/20 rounded-lg border border-muted"
          >
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
                  {calculatePercentage(candidate)}%
                </span>
                <span className="text-sm text-muted-foreground">
                  (
                  {candidate.votes >= 2
                    ? `${candidate.votes} votes`
                    : `${candidate.votes} vote`}
                  )
                </span>
              </div>
            </div>
            <div className="relative pt-1">
              <div className="flex mb-2 items-center justify-between">
                <div>
                  <span
                    className={`text-xs md:font-semibold inline-block md:py-1 px-2 uppercase rounded-full text-white ${
                      candidate?.color?.includes("bg-")
                        ? candidate?.color
                        : `bg-[${candidate?.color}]`
                    }`}
                  >
                    {candidate.slogan}
                  </span>
                </div>
              </div>
              {/* Progress with custom indicator color */}
              <div className="overflow-hidden h-5 text-xs flex rounded-full bg-gray-100">
                {calculatePercentage(candidate) > 10 ? (
                  <div
                    style={{
                      width: `${calculatePercentage(candidate)}%`,
                    }}
                    className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${
                      candidate?.color?.includes("bg-")
                        ? candidate?.color
                        : `bg-[${candidate?.color}]`
                    }`}
                  >
                    <span className="px-2 font-semibold">
                      {calculatePercentage(candidate)}%
                    </span>
                  </div>
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-300">
                    <span className="px-2 font-semibold">0%</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResultsVisualization;
