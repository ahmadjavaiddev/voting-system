"use server";

import dbConnect from "@/lib/db";
import { emailService, generateVerificationToken } from "@/lib/SendEmail";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function registerUser(prevState, formData) {
  try {
    // Convert FormData to plain object
    const data = Object.fromEntries(formData.entries());
    const { name, email, password, cnic, phone, faceDescriptor } = data;

    // Validate required fields
    if (!name || !email || !password || !cnic || !phone) {
      return "All fields are required.";
    }
    // Basic phone normalization (remove non-digits) and simple validation
    const normalizedPhone = phone.replace(/[^\d+]/g, "");
    if (normalizedPhone.length < 7) {
      return "Invalid phone number.";
    }

    if (!faceDescriptor) {
      return "Face authentication is required for registration.";
    }

    await dbConnect();

    // Check for existing user by email, phone or cnic
    const existing = await User.findOne({
      $or: [{ email }, { phone: normalizedPhone }, { cnic }],
    }).lean();
    if (existing) {
      if (existing.email === email) return "Email already registered.";
      if (existing.phone === normalizedPhone)
        return "Phone number already registered.";
      if (existing.cnic === cnic) return "CNIC already registered.";
      return "User already exists.";
    }

    // Parse the submitted face descriptor (stored client-side as JSON string of number array)
    let submittedDescriptor;
    try {
      submittedDescriptor = JSON.parse(faceDescriptor);
    } catch (err) {
      return "Invalid face data provided.";
    }
    if (
      !Array.isArray(submittedDescriptor) ||
      submittedDescriptor.length < 64
    ) {
      return "Corrupted face data. Please recapture your face.";
    }

    // Helper to compute Euclidean distance WITHOUT importing heavy face-api server side
    const euclideanDistance = (a, b) => {
      if (!Array.isArray(a) || !Array.isArray(b) || a.length !== b.length)
        return Number.MAX_VALUE;
      let sum = 0;
      for (let i = 0; i < a.length; i++) {
        const d = a[i] - b[i];
        sum += d * d;
      }
      return Math.sqrt(sum);
    };

    // Threshold: typical face-api.js default ~0.6; we choose a bit stricter (0.5) to reduce duplicates
    const FACE_DUPLICATE_THRESHOLD = 0.5;

    // Stream through existing user face descriptors and compare
    // (Projection to only needed field keeps memory lower.)
    const existingUsersWithFace = await User.find(
      { faceId: { $ne: null } },
      { faceId: 1 }
    ).lean();
    for (const u of existingUsersWithFace) {
      try {
        const ref = JSON.parse(u.faceId);
        if (Array.isArray(ref) && ref.length === submittedDescriptor.length) {
          const dist = euclideanDistance(ref, submittedDescriptor.map(Number));
          if (dist < FACE_DUPLICATE_THRESHOLD) {
            return "A user with a very similar face is already registered.";
          }
        }
      } catch (e) {
        // Ignore malformed stored data
      }
    }

    // Hash password
    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashed,
      cnic,
      phone: normalizedPhone,
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
