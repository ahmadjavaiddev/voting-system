import mongoose, { Schema, Document, models } from "mongoose";

export interface ICandidate {
  name: string;
  slogan: string;
  color: string;
  members: string[];
  platform: string[];
  winner: boolean[];
}

export interface IElection extends Document {
  title: string;
  description: string;
  startTime: Date;
  endTime: Date;
  status: "upcoming" | "live" | "ended";
  createdAt: Date;
  eligibleVoters: number;
  rules: string[];
  candidates: ICandidate[];
}

const CandidateSchema = new Schema<ICandidate>({
  name: { type: String, required: true },
  slogan: { type: String, required: true },
  color: { type: String, required: true },
  members: [{ type: String, required: true }],
  platform: [{ type: String, required: true }],
  winner: [{ type: Boolean, default: false }],
});

const ElectionSchema = new Schema<IElection>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  status: {
    type: String,
    enum: ["upcoming", "live", "ended"],
    default: "upcoming",
  },
  createdAt: { type: Date, default: Date.now },
  eligibleVoters: { type: Number, required: true },
  rules: [{ type: String, required: true }],
  candidates: { type: [CandidateSchema], required: true },
});

export default models.Election ||
  mongoose.model<IElection>("Election", ElectionSchema);
