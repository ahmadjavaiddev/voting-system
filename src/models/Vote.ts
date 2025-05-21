import mongoose, { Schema, Document, models } from "mongoose";

export interface IVote extends Document {
  userId: mongoose.Types.ObjectId;
  electionId: mongoose.Types.ObjectId;
  candidateId: mongoose.Types.ObjectId;
  timestamp: Date;
}

const VoteSchema = new Schema<IVote>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    electionId: {
      type: Schema.Types.ObjectId,
      ref: "Election",
      required: true,
    },
    candidateId: {
      type: Schema.Types.ObjectId,
      ref: "Candidate",
      required: true,
    },
  },
  { timestamps: true }
);

export default models.Vote || mongoose.model<IVote>("Vote", VoteSchema);
