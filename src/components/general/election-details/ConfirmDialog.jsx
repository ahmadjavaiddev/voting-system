import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import React from "react";

const ConfirmDialog = ({
  showConfirmDialog,
  setShowConfirmDialog,
  selectedCandidate,
  election,
  isVoting,
  handleVoteSubmit,
}) => {
  return (
    <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm Your Vote</DialogTitle>
          <DialogDescription>
            You are about to cast your vote for this election. This action
            cannot be undone.
          </DialogDescription>
        </DialogHeader>

        {selectedCandidate !== null && (
          <div className="rounded-md border p-4">
            <h3 className="font-medium">
              Selected Candidate:{" "}
              <span className="text-primary">
                {
                  election?.candidates?.find((c) => c.id === selectedCandidate)
                    ?.name
                }
              </span>
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              By confirming, you agree that you are eligible to vote in this
              election and are casting your vote voluntarily.
            </p>
          </div>
        )}

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setShowConfirmDialog(false)}
            disabled={isVoting}
          >
            Cancel
          </Button>
          <Button onClick={handleVoteSubmit} disabled={isVoting}>
            {isVoting ? "Processing..." : "Confirm Vote"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmDialog;
