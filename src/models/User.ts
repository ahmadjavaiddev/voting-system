import mongoose, { Schema, Document, models } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'user';
  isVerified: boolean;
  isApproved: boolean;
  faceId?: string;
  createdAt: Date;
}

const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'user'], default: 'user' },
  isVerified: { type: Boolean, default: false },
  isApproved: { type: Boolean, default: false },
  faceId: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export default models.User || mongoose.model<IUser>('User', UserSchema); 