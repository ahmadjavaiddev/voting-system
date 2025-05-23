import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";
import ElectionStats from "./ElectionStats";
import ResultsVisualization from "./ResultsVisualization";
import ElectionInformation from "./ElectionInformation";

const SelectedElection = ({
  selectedElection,
  totalCastVotes,
  calculatePercentage,
}) => {
  return (
    <div className="lg:col-span-2 space-y-6">
      {selectedElection && (
        <div className="lg:col-span-2 space-y-6 sticky top-16">
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
              <ElectionStats
                totalCastVotes={totalCastVotes}
                selectedElection={selectedElection}
                calculatePercentage={calculatePercentage}
              />
              <ResultsVisualization
                selectedElection={selectedElection}
                totalCastVotes={totalCastVotes}
                calculatePercentage={calculatePercentage}
              />
              <ElectionInformation
                selectedElection={selectedElection}
                totalCastVotes={totalCastVotes}
                calculatePercentage={calculatePercentage}
              />
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default SelectedElection;
