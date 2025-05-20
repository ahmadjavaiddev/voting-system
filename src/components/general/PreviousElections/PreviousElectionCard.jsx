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
import { formatDate } from "@/lib/index";
import { CheckCircle2, ChevronRight } from "lucide-react";
import Link from "next/link";
import React from "react";

const PreviousElectionCard = ({ election, isAdmin }) => {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <CardTitle className="line-clamp-1">{election.title}</CardTitle>
          <Badge
            variant="outline"
            className="bg-gray-100 text-gray-800 hover:bg-gray-200 border-gray-200"
          >
            Completed
          </Badge>
        </div>
        <CardDescription>
          {election.candidates.length} candidates • {election.votes} total votes
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Winner:</span>
            <span className="bg-green-100 rounded px-2 flex items-center">
              {election.candidates.map((party) => party.winner && party.name)}
              <CheckCircle2 className="ml-1 h-4 w-4" />
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Started:</span>
            <span>{formatDate(election.startTime)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Ended:</span>
            <span>{formatDate(election.endTime)}</span>
          </div>
          <div className="mt-2">
            <p className="text-sm font-medium mb-1">Candidates:</p>
            <div className="flex flex-wrap gap-2">
              {election.candidates.map((party, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className={
                    party.winner
                      ? "bg-green-100 text-green-800 border-green-200"
                      : "bg-background"
                  }
                >
                  {party.name}{" "}
                  {party.winner && <CheckCircle2 className="ml-1 h-3 w-3" />}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Link
          href={`/${isAdmin ? "admin" : "user"}/election/${election._id}`}
          className="w-full"
        >
          <Button
            variant="outline"
            className="w-full flex items-center justify-center"
          >
            View Results <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default PreviousElectionCard;
