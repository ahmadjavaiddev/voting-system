"use server";

import dbConnect from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";

export async function registerUser(prevState, formData) {
  try {
    // Convert FormData to plain object
    const data = Object.fromEntries(formData.entries());
    const { name, email, password, cnic } = data;

    await dbConnect();

    // Check for existing user
    const existing = await User.findOne({ email });
    if (existing) {
      return "Email already registered.";
    }

    // Hash password
    const hashed = await bcrypt.hash(password, 10);
    await User.create({
      name,
      email,
      password: hashed,
      cnic,
      isVerified: false,
      isApproved: false,
      role: "user",
    });

    // Redirect to login page after successful registration
    return undefined;
  } catch (error) {
    return error.message || "Registration failed.";
  }
}
