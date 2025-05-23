"use client";
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
import { ChevronRight } from "lucide-react";
import moment from "moment";
import Link from "next/link";
import React from "react";

const LiveElectionCard = ({ election, isAdmin }) => {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <CardTitle className="line-clamp-1">{election.title}</CardTitle>
          <Badge variant="default" className="bg-green-500 hover:bg-green-600">
            Live
          </Badge>
        </div>
        <CardDescription>
          {election.candidates.length} candidates • {election.votes} votes cast
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Started:</span>
            <span>{moment(election.startTime).format("LLL")}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Ends in:</span>
            <span className="font-medium text-amber-600">
              {moment().isAfter(moment(election.endTime))
                ? "Ended"
                : moment(election.endTime).format("LLL")}
            </span>
          </div>
          <div className="mt-2">
            <p className="text-sm font-medium mb-1">Candidates:</p>
            <div className="flex flex-wrap gap-2">
              {election.candidates.map((party, index) => (
                <Badge key={index} variant="outline" className="bg-background">
                  {party.name}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex gap-2">
        <Link
          href={`/${isAdmin ? "admin" : "user"}/election/${election._id}`}
          className="w-full"
        >
          <Button className="w-full">Cast Your Vote</Button>
        </Link>
        <Link
          href={`/${isAdmin ? "admin" : "user"}/election/results?id=${
            election._id
          }`}
          className="w-full"
        >
          <Button className="w-full" variant="outline">
            View Results <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default LiveElectionCard;
