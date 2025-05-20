import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatDate, getTimeRemaining } from "@/lib/index";
import React from "react";

const UpcomingElectionCard = ({ election }) => {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <CardTitle className="line-clamp-1">{election.title}</CardTitle>
          <Badge
            variant="outline"
            className="bg-blue-100 text-blue-800 hover:bg-blue-200 border-blue-200"
          >
            Upcoming
          </Badge>
        </div>
        <CardDescription>
          {election.parties.length} candidates registered
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Starts in:</span>
            <span className="font-medium text-blue-600">
              {getTimeRemaining(election.startTime)}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Start date:</span>
            <span>{formatDate(election.startTime)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">End date:</span>
            <span>{formatDate(election.endTime)}</span>
          </div>
          <div className="mt-2">
            <p className="text-sm font-medium mb-1">Candidates:</p>
            <div className="flex flex-wrap gap-2">
              {election.parties.map((party, index) => (
                <Badge key={index} variant="outline" className="bg-background">
                  {party}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">
          Set Reminder
        </Button>
      </CardFooter>
    </Card>
  );
};

export default UpcomingElectionCard;
