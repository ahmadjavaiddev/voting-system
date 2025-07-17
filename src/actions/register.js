"use server";

import dbConnect from "@/lib/db";
import { emailService, generateVerificationToken } from "@/lib/SendEmail";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function registerUser(prevState, formData) {
  try {
    // Convert FormData to plain object
    const data = Object.fromEntries(formData.entries());
    const { name, email, password, cnic, faceDescriptor } = data;

    // Validate required fields
    if (!name || !email || !password || !cnic) {
      return "All fields are required.";
    }

    if (!faceDescriptor) {
      return "Face authentication is required for registration.";
    }

    await dbConnect();

    // Check for existing user
    const existing = await User.findOne({ email }).lean();
    if (existing) {
      return "Email already registered.";
    }

    // Hash password
    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashed,
      cnic,
      isVerified: false,
      isApproved: false,
      role: "user",
      faceId: faceDescriptor,
      faceRecognitionEnabled: true,
    });

    const token = generateVerificationToken();

    user.verificationToken = token;
    user.verificationTokenExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours
    await user.save();

    const emailResult = await emailService.sendVerificationEmail(
      user.email,
      token,
      user.name
    );

    if (!emailResult.success) {
      // If email fails, you might want to delete the user or handle accordingly
      console.error("Failed to send verification email:", emailResult.error);
      return "Failed to send verification email";
    }

    // Redirect to login page after successful registration
    return undefined;
  } catch (error) {
    return error.message || "Registration failed.";
  }
}
