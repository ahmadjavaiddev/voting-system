import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import moment from "moment";
import { Calendar, HelpCircle, Info, Shield, Timer, Users } from "lucide-react";
import React from "react";

const LeftColumn = ({ election }) => {
  if (!election) {
    return <div>Loading...</div>;
  }

  return (
    <div className="md:col-span-1 space-y-6">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Info className="h-4 w-4" /> Election Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="mb-1 text-sm font-medium text-muted-foreground">
              Start Date
            </h3>
            <p className="flex items-center gap-1.5 text-sm">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              {moment(election.startTime).format("LLL")}
              <span className="ml-2 text-xs text-muted-foreground">({moment(election.startTime).fromNow()})</span>
            </p>
          </div>
          <div>
            <h3 className="mb-1 text-sm font-medium text-muted-foreground">
              End Date
            </h3>
            <p className="flex items-center gap-1.5 text-sm">
              <Timer className="h-4 w-4 text-muted-foreground" />
              {moment(election.endTime).format("LLL")}
              <span className="ml-2 text-xs text-muted-foreground">({moment(election.endTime).fromNow()})</span>
            </p>
          </div>
          <div>
            <h3 className="mb-1 text-sm font-medium text-muted-foreground">
              Eligible Voters
            </h3>
            <p className="flex items-center gap-1.5 text-sm">
              <Users className="h-4 w-4 text-muted-foreground" />
              {election.eligibleVoters || 50}
            </p>
          </div>
          <Separator />
          <div>
            <h3 className="mb-2 text-sm font-medium text-muted-foreground">
              Election Rules
            </h3>
            <ul className="space-y-2 text-sm">
              {election?.rules?.map((rule, index) => (
                <li key={index} className="flex items-start gap-2">
                  <Shield className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-muted-foreground" />
                  <span>{rule}</span>
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Help section */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <HelpCircle className="h-4 w-4" /> Need Help?
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm">
            If you encounter any issues while voting or have questions about the
            election process, please contact the election committee.
          </p>
          <Button variant="outline" className="w-full text-sm">
            Contact Support
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default LeftColumn;
