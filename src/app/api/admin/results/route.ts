import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Vote from '@/models/Vote';
import Election from '@/models/Election';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

function getToken(req: NextRequest) {
  const auth = req.headers.get('authorization');
  if (!auth) return null;
  return auth.replace('Bearer ', '');
}

export async function POST(req: NextRequest) {
  await dbConnect();
  const { electionId } = await req.json();
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
  const election = await Election.findById(electionId);
  if (!election) {
    return NextResponse.json({ error: 'Election not found' }, { status: 404 });
  }
  const votes = await Vote.find({ electionId });
  const results: Record<string, number> = {};
  for (const party of election.parties) {
    results[party] = votes.filter(v => v.party === party).length;
  }
  return NextResponse.json({ results });
} 