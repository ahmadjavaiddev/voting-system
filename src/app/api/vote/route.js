import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Vote from "@/models/Vote";
import Election from "@/models/Election";
import { verifyJWT } from "@/lib/index";
import Candidate from "@/models/Candidate";
import User from "@/models/User";
import * as faceapi from "face-api.js";

function getToken(req) {
  const auth = req.headers.get("cookie");
  if (!auth) return null;
  return auth.replace("token=", "");
}

function compareDescriptors(descriptor1, descriptor2) {
  return faceapi.euclideanDistance(descriptor1, descriptor2) < 0.5;
}

async function faceRecognition(userId, submittedDescriptor) {
  // Fetch user from DB
  const user = await User.findById(userId);
  if (!user || !user.faceId) return false;
  let referenceDescriptor;
  try {
    referenceDescriptor = JSON.parse(user.faceId);
  } catch {
    return false;
  }
  return compareDescriptors(referenceDescriptor, submittedDescriptor);
}

export async function POST(req) {
  try {
    const { electionId, candidateId, userDescriptor } = await req.json();
    if (!electionId || !candidateId || !userDescriptor) {
      return NextResponse.json(
        { error: "Missing required fields." },
        { status: 400 }
      );
    }

    const token = getToken(req);
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    let payload = await verifyJWT(token);
    if (!payload) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const userId = payload.userId;
    if (!userId) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    await dbConnect();
    // Face recognition check
    const faceOk = await faceRecognition(userId, userDescriptor);
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
    await Vote.create({ userId, electionId, candidateId });
    await Candidate.updateOne({ _id: candidateId }, { $inc: { votes: 1 } });

    return NextResponse.json({
      message: "Vote cast successfully.",
      success: true,
    });
  } catch (error) {
    console.log("Error in voting:", error.message);
    return NextResponse.json(
      { error: "Error While Voting in this election." },
      { status: 403 }
    );
  }
}
