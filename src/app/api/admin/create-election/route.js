import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import { validateJWTToken } from "@/lib/index";
import Election from "@/models/Election";

export async function POST(req) {
  try {
    const payload = await validateJWTToken(req);
    if (!payload) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();

    const {
      title,
      description,
      startTime,
      endTime,
      eligibleVoters,
      rules,
      candidates,
    } = await req.json();

    if (
      validateElectionData(
        title,
        description,
        startTime,
        endTime,
        eligibleVoters,
        rules,
        candidates
      )
    ) {
      return NextResponse.json({ error: "Invalid data." }, { status: 400 });
    }

    const election = await Election.create({
      title,
      candidates,
      description,
      eligibleVoters,
      rules,
      startTime: new Date(startTime),
      endTime: new Date(endTime),
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

function validateElectionData(
  title,
  description,
  startTime,
  endTime,
  eligibleVoters,
  rules,
  candidates
) {
  return (
    [
      title,
      description,
      startTime,
      endTime,
      eligibleVoters,
      rules,
      candidates,
    ].every((item) => !item) ||
    !Array.isArray(candidates) ||
    candidates.length < 2 ||
    eligibleVoters < 3 ||
    !Array.isArray(rules) ||
    rules.length < 1
  );
}
