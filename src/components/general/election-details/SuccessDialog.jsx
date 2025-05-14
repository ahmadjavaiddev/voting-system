import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CheckCircle } from "lucide-react";
import React from "react";

const SuccessDialog = ({ showSuccessDialog, setShowSuccessDialog }) => {
  return (
    <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-green-600">
            <CheckCircle className="h-5 w-5" /> Vote Successfully Recorded
          </DialogTitle>
          <DialogDescription>
            Thank you for participating in this election.
          </DialogDescription>
        </DialogHeader>

        <div className="rounded-md bg-green-50 p-4 text-center">
          <CheckCircle className="mx-auto mb-2 h-12 w-12 text-green-500" />
          <h3 className="text-lg font-medium text-green-800">
            Your vote has been counted
          </h3>
          <p className="mt-1 text-sm text-green-700">
            Your participation helps shape the future of our community. The
            final results will be announced after the election closes.
          </p>
        </div>

        <DialogFooter>
          <Button
            onClick={() => setShowSuccessDialog(false)}
            className="w-full"
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SuccessDialog;
