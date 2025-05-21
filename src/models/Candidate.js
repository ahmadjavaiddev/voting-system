import mongoose, { Schema, models } from "mongoose";

const CandidateSchema = new Schema(
  {
    name: { type: String, required: true },
    image: { type: String, required: true },
    slogan: { type: String, required: true },
    color: { type: String, required: true },
    members: [
      {
        name: { type: String, required: true },
        image: { type: String, required: true },
        role: { type: String, required: true },
      },
    ],
    description: { type: String },
    votes: { type: Number, default: 0 },
    platform: [
      {
        name: { type: String },
        url: { type: String },
      },
    ],
    winner: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default models.Candidate || mongoose.model("Candidate", CandidateSchema);
