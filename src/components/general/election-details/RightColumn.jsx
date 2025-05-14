"use client";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { calculatePercentage } from "@/lib/index";
import { Progress } from "@/components/ui/progress";
import {
  AlertCircle,
  CheckCircle,
  PartyPopper,
  ThumbsUp,
  Trophy,
  Vote,
} from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const RightColumn = ({ election }) => {
  console.log("election Right ::", election);
  const router = useRouter();
  const [selectedCandidate, setSelectedCandidate] = useState(0);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [isVoting, setIsVoting] = useState(false);
  const [hasVoted, setHasVoted] = useState(election.userHasVoted);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [activeTab, setActiveTab] = useState("details");

  // Handle vote submission
  const handleVoteSubmit = () => {
    if (selectedCandidate === null) return;

    setIsVoting(true);
    // Simulate API call
    setTimeout(() => {
      setIsVoting(false);
      setShowConfirmDialog(false);
      setHasVoted(true);
      setShowSuccessDialog(true);
    }, 1500);
  };

  // Calculate total votes
  const totalVotes = election.candidates?.reduce(
    (sum, candidate) => sum + candidate.votes,
    0
  );
  return (
    <div className="md:col-span-2">
      {/* Alert for voted status */}
      {hasVoted && (
        <Alert className="mb-6 border-green-200 bg-green-50 text-green-800">
          <CheckCircle className="h-4 w-4" />
          <AlertTitle>Vote Recorded</AlertTitle>
          <AlertDescription>
            Your vote has been successfully recorded. Thank you for
            participating in this election.
          </AlertDescription>
        </Alert>
      )}

      {/* Tabs for details and results */}
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-4"
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="details">Election Details</TabsTrigger>
          <TabsTrigger value="results">Current Results</TabsTrigger>
        </TabsList>

        {/* Details tab */}
        <TabsContent value="details" className="space-y-6">
          {/* Election description */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-4 w-4" /> About This Election
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm">{election.description}</p>
            </CardContent>
          </Card>

          {/* Voting section */}
          <Card className={hasVoted ? "opacity-60" : ""}>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <Vote className="h-4 w-4" /> Cast Your Vote
              </CardTitle>
              <CardDescription>
                Select one candidate from the list below
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup
                value={selectedCandidate?.toString()}
                onValueChange={(value) =>
                  setSelectedCandidate(Number.parseInt(value))
                }
                className="space-y-4"
                disabled={hasVoted}
              >
                {election.candidates?.map((candidate) => (
                  <div
                    key={candidate.id}
                    className={`relative rounded-lg border p-4 transition-all hover:bg-accent ${
                      selectedCandidate === candidate.id
                        ? "border-primary ring-1 ring-primary"
                        : ""
                    }`}
                  >
                    <RadioGroupItem
                      value={candidate.id.toString()}
                      id={`candidate-${candidate.id}`}
                      className="absolute right-4 top-4"
                      disabled={hasVoted}
                    />
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <div
                          className={`h-3 w-3 rounded-full ${candidate.color}`}
                        ></div>
                        <h3 className="font-medium">{candidate.name}</h3>
                      </div>
                      <p className="text-sm italic text-muted-foreground">
                        "{candidate.slogan}"
                      </p>
                      <div>
                        <h4 className="text-xs font-medium uppercase text-muted-foreground">
                          Key Members
                        </h4>
                        <ul className="mt-1 text-sm">
                          {candidate.members?.map((member, index) => (
                            <li key={index}>{member}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-xs font-medium uppercase text-muted-foreground">
                          Platform
                        </h4>
                        <ul className="mt-1 space-y-1">
                          {candidate.platform?.map((point, index) => (
                            <li
                              key={index}
                              className="flex items-start gap-2 text-sm"
                            >
                              <ThumbsUp className="mt-0.5 h-3 w-3 flex-shrink-0 text-muted-foreground" />
                              <span>{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </RadioGroup>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full"
                disabled={selectedCandidate === null || hasVoted}
                onClick={() => setShowConfirmDialog(true)}
              >
                {hasVoted ? "Vote Recorded" : "Submit Vote"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Results tab */}
        <TabsContent value="results" className="space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <PartyPopper className="h-4 w-4" /> Current Results
              </CardTitle>
              <CardDescription>
                Live results based on {election.totalVotes} votes (
                {calculatePercentage(
                  election.totalVotes,
                  election.eligibleVoters
                )}
                % turnout)
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {election.candidates?.map((candidate) => (
                <div key={candidate.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div
                        className={`h-3 w-3 rounded-full ${candidate.color}`}
                      ></div>
                      <span className="font-medium">{candidate.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">
                        {calculatePercentage(candidate.votes, totalVotes)}%
                      </span>
                      <span className="text-xs text-muted-foreground">
                        ({candidate.votes} votes)
                      </span>
                    </div>
                  </div>
                  <Progress
                    value={calculatePercentage(candidate.votes, totalVotes)}
                    className={`h-2 ${candidate.color}`}
                  />
                </div>
              ))}

              <Alert variant="default" className="mt-6 bg-muted/50">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Results are preliminary</AlertTitle>
                <AlertDescription>
                  These results are updated in real-time as votes are counted.
                  Final results will be announced after the election closes.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RightColumn;
