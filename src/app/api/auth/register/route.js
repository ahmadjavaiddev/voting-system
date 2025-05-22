import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";

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
    name,
    email,
    password: hashed,
    isVerified: false,
    isApproved: false,
    role: "user",
  });

  // Generate email verification token (for demo, just use user._id)
  const token = user._id.toString();

  // Send verification email (for demo, just log)
  // In production, use nodemailer to send real email
  console.log(
    `Verify email: http://localhost:3000/verify-email?token=${token}`
  );

  return NextResponse.json({
    message: "Registered. Please verify your email.",
  });
}
