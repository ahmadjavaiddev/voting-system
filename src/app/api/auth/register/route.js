import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { emailService, generateVerificationToken } from "@/lib/SendEmail";

// Dummy NADRA API check
async function nadraCheck(cnic, name) {
  // Simulate NADRA check (always returns true for demo)
  return true;
}

export async function POST(req) {
  await dbConnect();
  const { name, email, password, cnic } = await req.json();

  if (!name || !email || !password || !cnic) {
    return NextResponse.json(
      { error: "All fields are required." },
      { status: 400 }
    );
  }

  // Dummy NADRA check
  const nadraVerified = await nadraCheck(cnic, name);
  if (!nadraVerified) {
    return NextResponse.json(
      { error: "NADRA verification failed." },
      { status: 400 }
    );
  }

  const existing = await User.findOne({ email });
  if (existing) {
    return NextResponse.json(
      { error: "Email already registered." },
      { status: 400 }
    );
  }

  const hashed = await bcrypt.hash(password, 10);
  const user = await User.create({
    name: name,
    email: email,
    password: hashed,
    isVerified: false,
    isApproved: false,
    role: "user",
  });

  const token = generateVerificationToken();
  console.log("token ::", token);
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
    return NextResponse.json(
      { error: "Failed to send verification email" },
      { status: 500 }
    );
  }

  return NextResponse.json({
    message:
      "Registration successful! Please check your email to verify your account.",
  });
}
