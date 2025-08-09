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
import { getTimeEnded } from "@/lib/index";
import { AlertCircle, CheckCircle, ThumbsUp, Trophy, Vote } from "lucide-react";
import React, { useEffect, useState } from "react";
import ConfirmDialog from "./ConfirmDialog";
import SuccessDialog from "./SuccessDialog";
import axios from "axios";
import FaceAuthDialog from "./FaceAuthDialog";

const RightColumn = ({ election, onVoteSuccess }) => {
  if (!election) {
    return <div>Loading...</div>;
  }

  const [selectedCandidate, setSelectedCandidate] = useState("");
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [selectedMember, setSelectedMember] = useState("");
  const [isVoting, setIsVoting] = useState(false);
  const [hasVoted, setHasVoted] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
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
        memberId: selectedMember || null,
        userDescriptor: capturedDescriptor,
      });

      if (response.data.success) {
        setIsVoting(false);
        setShowConfirmDialog(false);
        setHasVoted(true);
        setShowSuccessDialog(true);
        setCapturedDescriptor(null);
        setErrorMessage("");

        // Refresh election data to show updated vote counts
        if (onVoteSuccess) {
          onVoteSuccess();
        }
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

      {/* Details Area */}
      <Card className="mb-4">
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
      {!hasVoted && !electionEnded && (
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
              onValueChange={(val) => {
                setSelectedCandidate(val);
                setSelectedMember("");
              }}
              className="space-y-4"
            >
              {election.candidates?.map((candidate) => {
                const isSelected = selectedCandidate === candidate._id;
                return (
                  <div
                    key={candidate._id}
                    className={`relative rounded-lg border p-4 transition-all hover:bg-accent cursor-pointer ${
                      isSelected ? "border-primary ring-1 ring-primary" : ""
                    }`}
                    onClick={() => {
                      setSelectedCandidate(candidate._id);
                      setSelectedMember("");
                    }}
                  >
                    <RadioGroupItem
                      value={candidate._id}
                      id={candidate._id}
                      checked={isSelected}
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
                          Key Members (choose one)
                        </h4>
                        <ul className="mt-1 text-sm grid gap-1">
                          {candidate.members?.map((member) => {
                            const memberSelected =
                              selectedMember === member._id;
                            return (
                              <li
                                key={member._id}
                                className={`flex items-center gap-2 text-sm rounded px-2 py-1 cursor-pointer border ${
                                  memberSelected
                                    ? "bg-primary/10 border-primary"
                                    : "hover:bg-accent"
                                }`}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedCandidate(candidate._id);
                                  setSelectedMember(member._id);
                                }}
                              >
                                <img
                                  src={member.image}
                                  alt={member.name}
                                  className="h-5 w-5 rounded-full"
                                />
                                <span>{member.name}</span>
                                <span className="text-xs text-muted-foreground">
                                  ({member.role})
                                </span>
                                {memberSelected && (
                                  <span className="ml-auto text-xs text-primary font-medium">
                                    Selected
                                  </span>
                                )}
                              </li>
                            );
                          })}
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
                );
              })}
            </RadioGroup>
          </CardContent>
          <CardFooter>
            <Button
              className="w-full"
              disabled={!selectedCandidate || !selectedMember}
              onClick={() => setShowFaceAuthDialog(true)}
            >
              Submit Vote
            </Button>
          </CardFooter>
        </Card>
      )}

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
        selectedMember={selectedMember}
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
