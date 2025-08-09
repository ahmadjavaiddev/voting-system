import React from "react";
import { getTotalCastVotes } from "@/lib/index";

const ResultsVisualization = ({ selectedElection }) => {
  function calculatePercentage(candidate) {
    const value = candidate.votes || 0;
    const total = getTotalCastVotes(selectedElection);

    if (total === 0) return 0;
    return Math.round((value / total) * 100);
  }

  const candidates = selectedElection?.candidates || [];
  const totalVotes = getTotalCastVotes(selectedElection);
  const winner = candidates.reduce(
    (acc, c) => (c.votes > (acc?.votes || 0) ? c : acc),
    null
  );

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Current Results</h3>
      {winner && (
        <div className="mb-6 p-4 rounded-md border bg-green-50 text-green-800 text-sm">
          <span className="font-semibold">Leading Party:</span> {winner.name} (
          {winner.votes} vote{winner.votes === 1 ? "" : "s"})
        </div>
      )}
      <div className="space-y-6">
        {candidates.map((candidate) => (
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
                <span className="font-medium flex items-center gap-2">
                  {candidate.name}
                  {winner && winner._id === candidate._id && (
                    <span className="text-xs bg-green-600 text-white px-2 py-0.5 rounded-full">
                      Winner
                    </span>
                  )}
                </span>
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
              {/* <div className="flex mb-2 items-center justify-between">
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
              </div> */}
              {/* Progress with custom indicator color */}
              <div className="overflow-hidden h-5 text-xs flex rounded-full bg-gray-200">
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
                  <div className="w-full h-full flex items-center justify-center bg-gray-200">
                    <span className="px-2 font-semibold">0%</span>
                  </div>
                )}
              </div>
            </div>

            {/* Member breakdown */}
            {candidate.members?.length > 0 && (
              <div className="mt-4">
                <h4 className="text-xs font-semibold uppercase text-muted-foreground mb-2">
                  Member Vote Breakdown
                </h4>
                <ul className="space-y-2">
                  {candidate.members.map((m) => {
                    const mv = m.votes || 0;
                    const pctWithinCandidate = candidate.votes
                      ? Math.round((mv / candidate.votes) * 100)
                      : 0;
                    return (
                      <li
                        key={m._id}
                        className="flex items-center gap-3 text-sm bg-white/40 dark:bg-white/5 border rounded p-2"
                      >
                        <img
                          src={m.image}
                          alt={m.name}
                          className="h-6 w-6 rounded-full object-cover border"
                        />
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <span className="font-medium">
                              {m.name}
                              <span className="ml-1 text-xs text-muted-foreground">
                                ({m.role})
                              </span>
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {mv} vote{mv === 1 ? "" : "s"}
                            </span>
                          </div>
                          <div className="w-full h-2 bg-gray-200 rounded overflow-hidden mt-1">
                            <div
                              className={`${
                                candidate?.color?.includes("bg-")
                                  ? candidate?.color
                                  : "bg-blue-500"
                              } h-full transition-all`}
                              style={{ width: `${pctWithinCandidate}%` }}
                            ></div>
                          </div>
                          <div className="flex justify-between text-[10px] mt-0.5 text-muted-foreground">
                            <span>{pctWithinCandidate}% of party votes</span>
                            {totalVotes > 0 && (
                              <span>
                                {Math.round((mv / totalVotes) * 100)}% overall
                              </span>
                            )}
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResultsVisualization;
