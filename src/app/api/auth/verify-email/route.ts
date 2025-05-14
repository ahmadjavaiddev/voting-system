import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/models/User';

export async function POST(req: NextRequest) {
  await dbConnect();
  const { token } = await req.json();

  if (!token) {
    return NextResponse.json({ error: 'Token required.' }, { status: 400 });
  }

  const user = await User.findById(token);
  if (!user) {
    return NextResponse.json({ error: 'Invalid token.' }, { status: 400 });
  }

  user.isVerified = true;
  await user.save();

  return NextResponse.json({ message: 'Email verified. Awaiting admin approval.' });
} 