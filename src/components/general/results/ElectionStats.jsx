import moment from "moment";
import React from "react";

const ElectionStats = ({ selectedElection }) => {
  const calculatePercentage = (part, total) => {
    if (total === 0) return 0;
    return ((part / total) * 100).toFixed(2);
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div className="bg-muted/30 p-3 rounded-lg">
        <div className="text-muted-foreground text-xs mb-1">Total Votes</div>
        <div className="text-xl font-semibold">
          {selectedElection.totalVotes}
        </div>
      </div>
      <div className="bg-muted/30 p-3 rounded-lg">
        <div className="text-muted-foreground text-xs mb-1">Turnout</div>
        <div className="text-xl font-semibold">
          {calculatePercentage(selectedElection.totalVotes, 950)}%
        </div>
      </div>
      <div className="bg-muted/30 p-3 rounded-lg">
        <div className="text-muted-foreground text-xs mb-1">Time Remaining</div>
        <div className="text-xl font-semibold">
          {moment().isAfter(moment(selectedElection.endTime))
            ? `Ended ${moment(selectedElection.endTime).fromNow()}`
            : `${moment(selectedElection.endTime).toNow(true)}`}
        </div>
      </div>
      <div className="bg-muted/30 p-3 rounded-lg">
        <div className="text-muted-foreground text-xs mb-1">Last Updated</div>
        <div className="text-sm font-medium">
          {selectedElection.lastUpdated
            ? moment(selectedElection.lastUpdated).format("LT")
            : "-"}
          <div className="text-xs text-muted-foreground">
            {selectedElection.lastUpdated
              ? moment(selectedElection.lastUpdated).format("LL")
              : "-"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ElectionStats;
