import { Info } from "lucide-react";
import moment from "moment";
import React from "react";

const ElectionInformation = ({ selectedElection, calculatePercentage }) => {
  return (
    <div className="bg-muted/20 p-4 rounded-lg">
      <div className="flex items-center gap-2 mb-2">
        <Info className="h-4 w-4 text-muted-foreground" />
        <h3 className="font-medium">Election Information</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
        <div>
          <p className="text-muted-foreground mb-1">Start Date:</p>
          <p className="font-medium">
            {selectedElection.startTime
              ? moment(selectedElection.startTime).format("LLL")
              : "-"}
          </p>
        </div>
        <div>
          <p className="text-muted-foreground mb-1">End Date:</p>
          <p className="font-medium">
            {selectedElection.endTime
              ? moment(selectedElection.endTime).format("LLL")
              : "-"}
          </p>
        </div>
        <div>
          <p className="text-muted-foreground mb-1">Eligible Voters:</p>
          <p className="font-medium">{selectedElection.eligibleVoters}</p>
        </div>
        <div>
          <p className="text-muted-foreground mb-1">Current Participation:</p>
          <p className="font-medium">
            {selectedElection.totalVotes} votes (
            {calculatePercentage(
              selectedElection.totalVotes,
              selectedElection.eligibleVoters
            )}
            %)
          </p>
        </div>
      </div>
    </div>
  );
};

export default ElectionInformation;
