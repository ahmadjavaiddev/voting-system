import mongoose, { Schema, models } from "mongoose";

const VoteSchema = new Schema(
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
    memberId: {
      type: Schema.Types.ObjectId,
      required: false,
    },
  },
  { timestamps: true }
);

export default models.Vote || mongoose.model("Vote", VoteSchema);
