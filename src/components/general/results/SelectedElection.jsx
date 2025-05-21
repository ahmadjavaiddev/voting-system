import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import moment from "moment";
import React from "react";
import ElectionStats from "./ElectionStats";
import ResultsVisualization from "./ResultsVisualization";
import ElectionInformation from "./ElectionInformation";

const SelectedElection = ({ selectedElection }) => {
  return (
    <div className="lg:col-span-2 space-y-6">
      {selectedElection && (
        <div className="lg:col-span-2 space-y-6">
          {(() => {
            const now = moment();
            const end = moment(selectedElection.endTime);
            if (!selectedElection.endTime) return null;
            if (now.isAfter(end)) {
              return (
                <div className="mb-2 text-red-500 font-semibold">
                  Election Ended {end.fromNow()} (ended at {end.format("LLL")})
                </div>
              );
            } else {
              return (
                <div className="mb-2 text-green-600 font-semibold">
                  Time Remaining: {end.toNow(true)} (ends at {end.format("LLL")}
                  )
                </div>
              );
            }
          })()}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl">
                    {selectedElection.title}
                  </CardTitle>
                  <CardDescription>
                    {selectedElection.description}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <ElectionStats selectedElection={selectedElection} />
              <ResultsVisualization selectedElection={selectedElection} />
              <ElectionInformation selectedElection={selectedElection} />
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default SelectedElection;
