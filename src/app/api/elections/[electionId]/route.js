import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Election from "@/models/Election";
import { validateJWTToken } from "@/lib/index";
import Vote from "@/models/Vote";
import mongoose from "mongoose";

export async function GET(request, { params }) {
  try {
    const electionId = (await params).electionId;

    const payload = await validateJWTToken(request);
    if (!payload) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    await dbConnect();
    const response = await Election.aggregate([
      {
        $match: { _id: new mongoose.Types.ObjectId(electionId) },
      },
      {
        $lookup: {
          from: "candidates",
          localField: "candidates",
          foreignField: "_id",
          as: "candidates",
        },
      },
      {
        $project: {
          title: 1,
          description: 1,
          startTime: 1,
          endTime: 1,
          eligibleVoters: 1,
          rules: 1,
          candidates: {
            _id: 1,
            name: 1,
            image: 1,
            slogan: 1,
            members: 1,
            description: 1,
            votes: 1,
            platform: 1,
            winner: 1,
          },
        },
      },
    ]);
    const election = response[0];

    if (!election || response.length === 0) {
      return NextResponse.json(
        { error: "Election not found" },
        { status: 404 }
      );
    }

    const already = await Vote.findOne({
      userId: payload.userId,
      electionId: election._id,
    });
    const result = {
      ...election,
      userHasVoted: !!already,
    };

    if (already) {
      result.userVote = already.candidateId;
    }

    return NextResponse.json({ election: result });
  } catch (error) {
    console.log("/api/elections/[electionId] ::", error);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 405 }
    );
  }
}
