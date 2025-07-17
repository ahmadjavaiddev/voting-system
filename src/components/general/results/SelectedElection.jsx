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

const SelectedElection = ({ selectedElection }) => {
  return (
    <div className="lg:col-span-2 space-y-6 mb-5" id={selectedElection._id}>
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
            <CardContent className="space-y-6 px-4">
              <ElectionStats selectedElection={selectedElection} />
              <hr className="border" />
              <ResultsVisualization selectedElection={selectedElection} />
              <hr className="border" />
              <ElectionInformation selectedElection={selectedElection} />
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default SelectedElection;
