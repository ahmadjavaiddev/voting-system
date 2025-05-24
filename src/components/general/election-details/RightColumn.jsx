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
import { calculatePercentage, getTimeEnded } from "@/lib/index";
import { Progress } from "@/components/ui/progress";
import {
  AlertCircle,
  CheckCircle,
  PartyPopper,
  ThumbsUp,
  Trophy,
  Vote,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import ConfirmDialog from "./ConfirmDialog";
import SuccessDialog from "./SuccessDialog";
import axios from "axios";
import FaceAuthDialog from "./FaceAuthDialog";

const RightColumn = ({ election, isAdmin = false }) => {
  const [selectedCandidate, setSelectedCandidate] = useState("");
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [isVoting, setIsVoting] = useState(false);
  const [hasVoted, setHasVoted] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [activeTab, setActiveTab] = useState("details");
  const [showFaceAuthDialog, setShowFaceAuthDialog] = useState(false);
  const [isFaceAuthenticated, setIsFaceAuthenticated] = useState(false);
  const [capturedDescriptor, setCapturedDescriptor] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setHasVoted(election.userHasVoted);
  }, [election.userHasVoted]);

  useEffect(() => {
    if (errorMessage) {
      setShowConfirmDialog(false);
    }
  }, [errorMessage]);

  const electionEnded = getTimeEnded(election.endTime);

  // Handle vote submission
  const handleVoteSubmit = async () => {
    try {
      setErrorMessage("");
      if (!selectedCandidate || !capturedDescriptor) return;
      setIsVoting(true);
      const response = await axios.post("/api/vote", {
        electionId: election._id,
        candidateId: selectedCandidate,
        userDescriptor: capturedDescriptor,
      });

      if (response.data.success) {
        setIsVoting(false);
        setShowConfirmDialog(false);
        setHasVoted(true);
        setShowSuccessDialog(true);
        setCapturedDescriptor(null);
        setErrorMessage("");
      } else if (response.data.error) {
        setErrorMessage(response.data.error);
        setIsVoting(false);
      }
    } catch (error) {
      setIsVoting(false);
      if (error.response && error.response.data && error.response.data.error) {
        setErrorMessage(error.response.data.error);
      } else {
        setErrorMessage("An unexpected error occurred. Please try again.");
      }
    }
  };

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

      {/* Alert if user did'nt cast the vote and also the time ended */}
      {!hasVoted && electionEnded && (
        <Alert className="mb-6 border-red-200 bg-red-100 text-red-800">
          <CheckCircle className="h-4 w-4" />
          <AlertTitle>Election Ended</AlertTitle>
          <AlertDescription>
            Election has been ended. Better luck for the next time.
          </AlertDescription>
        </Alert>
      )}

      {/* Alert for error */}
      {errorMessage && (
        <Alert className="mb-6 border-red-200 bg-red-100 text-red-800">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{errorMessage}</AlertDescription>
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

          {/* Voting section: only show if not admin, not voted, and not ended */}
          {!isAdmin && !hasVoted && !electionEnded && (
            <Card>
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
                  value={selectedCandidate}
                  onValueChange={setSelectedCandidate}
                  className="space-y-4"
                >
                  {election.candidates?.map((candidate) => (
                    <div
                      key={candidate._id}
                      className={`relative rounded-lg border p-4 transition-all hover:bg-accent cursor-pointer ${
                        selectedCandidate === candidate._id
                          ? "border-primary ring-1 ring-primary"
                          : ""
                      }`}
                      onClick={() => setSelectedCandidate(candidate._id)}
                    >
                      <RadioGroupItem
                        value={candidate._id}
                        id={candidate._id}
                        checked={selectedCandidate === candidate._id}
                        onClick={(e) => e.stopPropagation()}
                        className="absolute right-4 top-4"
                      />
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <img
                            src={candidate.image}
                            alt={candidate.name}
                            className="h-8 w-8 rounded-full"
                          />
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
                              <li
                                key={index}
                                className="flex items-start gap-2 text-sm"
                              >
                                <img
                                  src={member.image}
                                  alt={member.name}
                                  className="h-4 w-4 rounded-full"
                                />
                                <span>{member.name}</span>
                                <span className="text-xs text-muted-foreground">
                                  ({member.role})
                                </span>
                              </li>
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
                  disabled={!selectedCandidate}
                  onClick={() => setShowFaceAuthDialog(true)}
                >
                  Submit Vote
                </Button>
              </CardFooter>
            </Card>
          )}
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
                {calculatePercentage(election)}% turnout)
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {election.candidates?.map((candidate) => (
                <div key={candidate._id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div
                        className={`h-3 w-3 rounded-full ${candidate.color}`}
                      ></div>
                      <span className="font-medium">{candidate.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">
                        {calculatePercentage(election)}%
                      </span>
                      <span className="text-xs text-muted-foreground">
                        ({candidate.votes} votes)
                      </span>
                    </div>
                  </div>
                  <Progress
                    value={calculatePercentage(election)}
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

      <FaceAuthDialog
        open={showFaceAuthDialog}
        onClose={() => setShowFaceAuthDialog(false)}
        onCapture={(descriptor) => {
          setCapturedDescriptor(descriptor);
          setIsFaceAuthenticated(true);
          setShowFaceAuthDialog(false);
          setShowConfirmDialog(true);
        }}
      />
      <ConfirmDialog
        showConfirmDialog={showConfirmDialog && isFaceAuthenticated}
        setShowConfirmDialog={setShowConfirmDialog}
        selectedCandidate={selectedCandidate}
        election={election}
        isVoting={isVoting}
        handleVoteSubmit={handleVoteSubmit}
      />
      <SuccessDialog
        showSuccessDialog={showSuccessDialog}
        setShowSuccessDialog={setShowSuccessDialog}
      />
    </div>
  );
};

export default RightColumn;
