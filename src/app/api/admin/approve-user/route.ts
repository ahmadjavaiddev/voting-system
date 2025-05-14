import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/models/User';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

function getToken(req: NextRequest) {
  const auth = req.headers.get('authorization');
  if (!auth) return null;
  return auth.replace('Bearer ', '');
}

export async function POST(req: NextRequest) {
  await dbConnect();
  const { userId } = await req.json();
  const token = getToken(req);
  if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET) as any;
  } catch {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  }
  if (payload.role !== 'admin') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }
  const user = await User.findById(userId);
  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }
  user.isApproved = true;
  await user.save();
  return NextResponse.json({ message: 'User approved.' });
} 