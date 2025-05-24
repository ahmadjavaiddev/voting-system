import { calculatePercentage, getTotalCastVotes } from "@/lib/index";
import moment from "moment";
import React from "react";

const ElectionStats = ({ selectedElection }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div className="bg-muted/30 p-3 rounded-lg">
        <div className="text-muted-foreground text-xs mb-1">Total Votes</div>
        <div className="text-xl font-semibold">
          {getTotalCastVotes(selectedElection)}
        </div>
      </div>
      <div className="bg-muted/30 p-3 rounded-lg">
        <div className="text-muted-foreground text-xs mb-1">Turnout</div>
        <div className="text-xl font-semibold">
          {calculatePercentage(selectedElection)}%
        </div>
      </div>
      <div className="bg-muted/30 p-3 rounded-lg">
        <div className="text-muted-foreground text-xs mb-1">Time Remaining</div>
        <div className="text-md font-semibold">
          {moment().isAfter(moment(selectedElection.endTime))
            ? `Ended ${moment(selectedElection.endTime).fromNow()}`
            : moment(selectedElection.endTime).diff(moment(), "hours") +
              "h " +
              (moment(selectedElection.endTime).diff(moment(), "minutes") %
                60) +
              "m"}
        </div>
      </div>
      <div className="bg-muted/30 p-3 rounded-lg">
        <div className="text-muted-foreground text-xs mb-1">Last Updated</div>
        <div className="text-sm font-medium">
          {selectedElection.updatedAt
            ? moment(selectedElection.updatedAt).format("LT")
            : "-"}
          <div className="text-xs text-muted-foreground">
            {selectedElection.updatedAt
              ? moment(selectedElection.updatedAt).format("LL")
              : "-"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ElectionStats;
