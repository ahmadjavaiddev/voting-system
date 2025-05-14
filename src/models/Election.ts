import mongoose, { Schema, Document, models } from 'mongoose';

export interface IElection extends Document {
  title: string;
  parties: string[];
  startTime: Date;
  endTime: Date;
  status: 'upcoming' | 'live' | 'ended';
  createdAt: Date;
}

const ElectionSchema = new Schema<IElection>({
  title: { type: String, required: true },
  parties: [{ type: String, required: true }],
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  status: { type: String, enum: ['upcoming', 'live', 'ended'], default: 'upcoming' },
  createdAt: { type: Date, default: Date.now },
});

export default models.Election || mongoose.model<IElection>('Election', ElectionSchema); 