import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Vote from "@/models/Vote";
import Election from "@/models/Election";
import { verifyJWT } from "@/lib/index";

function getToken(req) {
  const auth = req.headers.get("cookie");
  if (!auth) return null;
  return auth.replace("token=", "");
}

// Mock face recognition (always true for demo)
async function faceRecognition(userId) {
  return true;
}

export async function POST(req) {
  try {
    await dbConnect();
    const { electionId, party } = await req.json();

    const token = getToken(req);
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    let payload = await verifyJWT(token);
    if (!payload) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }
    const userId = payload.userId;
    // Face recognition check
    const faceOk = await faceRecognition(userId);
    if (!faceOk) {
      return NextResponse.json(
        { error: "Face recognition failed." },
        { status: 403 }
      );
    }
    const election = await Election.findById(electionId);
    if (!election) {
      return NextResponse.json(
        { error: "Election not found." },
        { status: 404 }
      );
    }
    const now = new Date();
    if (now < election.startTime || now > election.endTime) {
      return NextResponse.json(
        { error: "Voting is not allowed at this time." },
        { status: 403 }
      );
    }
    // Check if user already voted
    const already = await Vote.findOne({ userId, electionId });
    if (already) {
      return NextResponse.json(
        { error: "You have already voted in this election." },
        { status: 403 }
      );
    }
    // Cast vote
    await Vote.create({ userId, electionId, party });
    return NextResponse.json({
      message: "Vote cast successfully.",
      success: true,
    });
  } catch (error) {
    console.log("Error in the Vote Route");
    return NextResponse.json(
      { error: "Error While Voting in this election." },
      { status: 403 }
    );
  }
}
