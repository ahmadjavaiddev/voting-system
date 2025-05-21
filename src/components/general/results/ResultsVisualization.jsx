import React from "react";

const ResultsVisualization = ({ selectedElection }) => {
  const calculatePercentage = (part, total) => {
    if (total === 0) return 0;
    return ((part / total) * 100).toFixed(2);
  };

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
                    selectedElection.totalVotes
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
                  <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-white bg-muted/80">
                    {candidate.slogan}
                  </span>
                </div>
              </div>
              <div className="overflow-hidden h-6 text-xs flex rounded-full bg-muted/30">
                <div
                  style={{
                    width: `${calculatePercentage(
                      candidate.votes,
                      selectedElection.totalVotes
                    )}%`,
                  }}
                  className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-600`}
                >
                  {calculatePercentage(
                    candidate.votes,
                    selectedElection.totalVotes
                  ) > 10 && (
                    <span className="px-2 font-semibold">
                      {calculatePercentage(
                        candidate.votes,
                        selectedElection.totalVotes
                      )}
                      %
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResultsVisualization;
