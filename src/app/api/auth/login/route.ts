import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { SignJWT } from "jose";

const JWT_SECRET = process.env.JWT_SECRET || "secret";

async function signJWT(payload: any) {
  const secret = new TextEncoder().encode(JWT_SECRET);
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1d")
    .sign(secret);
}

export async function POST(req: NextRequest) {
  await dbConnect();
  const { email, password } = await req.json();

  if (!email || !password) {
    return NextResponse.json(
      { error: "Email and password required." },
      { status: 400 }
    );
  }

  const user = await User.findOne({ email });
  if (!user) {
    return NextResponse.json(
      { error: "Invalid credentials." },
      { status: 401 }
    );
  }

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    return NextResponse.json(
      { error: "Invalid credentials." },
      { status: 401 }
    );
  }

  if (!user.isVerified) {
    return NextResponse.json({ error: "Email not verified." }, { status: 403 });
  }

  if (!user.isApproved) {
    return NextResponse.json(
      { error: "Account not approved by admin." },
      { status: 403 }
    );
  }

  const token = await signJWT({ userId: user._id.toString(), role: user.role });
  const response = NextResponse.json({
    user: { email: user.email, name: user.name, role: user.role },
  });
  response.cookies.set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24, // 1 day
  });
  return response;
}
