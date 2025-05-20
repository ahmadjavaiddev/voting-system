import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { calculatePercentage } from "@/lib/index";
import { Users, Vote } from "lucide-react";
import moment from "moment";
import React from "react";

const ElectionHeader = ({ election }) => {
  const now = moment();
  const start = moment(election.startTime);
  const end = moment(election.endTime);

  return (
    <div className="mb-6 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="text-2xl font-bold md:text-3xl">{election.title}</h1>
        <div className="mt-1 flex items-center gap-2">
          {now.isBefore(start) && (
            <Badge
              variant="default"
              className="bg-orange-500 hover:bg-orange-600"
            >
              Starting Soon
            </Badge>
          )}
          {now.isAfter(end) ? (
            <Badge variant="default" className="bg-red-500 hover:bg-red-600">
              Ended
            </Badge>
          ) : (
            <Badge
              variant="default"
              className="bg-green-500 hover:bg-green-600"
            >
              Live
            </Badge>
          )}
        </div>
      </div>
      <div className="mt-2 flex items-center gap-2 md:mt-0">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center gap-1 rounded-md bg-muted px-2 py-1 text-sm">
                <Users className="h-3.5 w-3.5" />
                <span>{election.totalVotes || 50}</span>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Total votes cast</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center gap-1 rounded-md bg-muted px-2 py-1 text-sm">
                <Vote className="h-3.5 w-3.5" />
                <span>
                  {calculatePercentage(
                    election.totalVotes || 50,
                    election.eligibleVoters || 101
                  )}
                  % Turnout
                </span>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>
                {election.totalVotes || 50} out of{" "}
                {election.eligibleVoters || 101} eligible voters
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default ElectionHeader;
