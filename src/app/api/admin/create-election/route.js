import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Election from "@/models/Election";
import Candidate from "@/models/Candidate";
import { getToken } from "next-auth/jwt";

export async function POST(req) {
  try {
    const token = await getToken({ req });
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    if (validateElectionData(body)) {
      return NextResponse.json({ error: "Invalid data." }, { status: 400 });
    }

    if (body.candidates.length < 2) {
      return NextResponse.json(
        { error: "There must be at least 2 candidates." },
        { status: 400 }
      );
    }

    await dbConnect();
    const candidatesID = await createCandidates(body.candidates);

    const election = await Election.create({
      title: body.title,
      candidates: candidatesID,
      description: body.description,
      eligibleVoters: body.eligibleVoters,
      rules: body.rules,
      startTime: new Date(body.startTime),
      endTime: new Date(body.endTime),
    });

    return NextResponse.json({ message: "Election created.", election });
  } catch (error) {
    console.error("Error in POST /api/admin/create-election:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

function validateElectionData(body) {
  return (
    [
      body.title,
      body.description,
      body.startTime,
      body.endTime,
      body.eligibleVoters,
      body.rules,
      body.candidates,
    ].every((item) => !item) ||
    !Array.isArray(body.candidates) ||
    body.candidates.length < 2 ||
    body.eligibleVoters < 3 ||
    !Array.isArray(body.rules) ||
    body.rules.length < 1
  );
}

async function createCandidates(candidates) {
  const candidatesID = [];
  for (const candidate of candidates) {
    const newCandidate = await Candidate.create({
      name: candidate.name,
      image: candidate.image,
      slogan: candidate.slogan,
      color: candidate.color,
      members: candidate.members,
      description: candidate.description,
    });
    candidatesID.push(newCandidate._id);
  }
  return candidatesID;
}
