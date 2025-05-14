import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Election from "@/models/Election";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "secret";

function getToken(req: NextRequest) {
  console.log("req.headers ::", req.headers);
  const auth = req.headers.get("cookie");
  if (!auth) return null;
  return auth.replace("token=", "");
}

export async function POST(req: NextRequest) {
  await dbConnect();
  const { title, parties, startTime, endTime } = await req.json();
  const token = getToken(req);
  if (!token)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET) as any;
  } catch {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }
  if (payload.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  if (
    !title ||
    !Array.isArray(parties) ||
    parties.length < 2 ||
    !startTime ||
    !endTime
  ) {
    return NextResponse.json({ error: "Invalid data." }, { status: 400 });
  }
  const election = await Election.create({
    title,
    parties,
    startTime: new Date(startTime),
    endTime: new Date(endTime),
    status: "upcoming",
  });
  return NextResponse.json({ message: "Election created.", election });
}
