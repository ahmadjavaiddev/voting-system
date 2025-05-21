import mongoose, { Schema, models } from "mongoose";

const ElectionSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    eligibleVoters: { type: Number, required: true },
    rules: [{ type: String, required: true }],
    candidates: [{ type: mongoose.Schema.Types.ObjectId, ref: "Candidate" }],
    status: {
      type: String,
      enum: ["upcoming", "live", "ended"],
      default: "upcoming",
    },
    totalVotes: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default models.Election || mongoose.model("Election", ElectionSchema);
