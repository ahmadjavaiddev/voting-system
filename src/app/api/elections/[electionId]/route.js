import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Election from "@/models/Election";
import { validateJWTToken } from "@/lib/index";
import Vote from "@/models/Vote";

export async function GET(request, { params }) {
  try {
    const electionId = (await params).electionId;

    const payload = await validateJWTToken(request);
    if (!payload) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    await dbConnect();
    const election = await Election.findById(electionId).lean();
    if (!election) {
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

    return NextResponse.json({ election: result });
  } catch (error) {
    console.log("Error While fetching the Election ::", error.message);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 405 }
    );
  }
}
