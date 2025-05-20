import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Election from "@/models/Election";
import Vote from "@/models/Vote";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

export async function GET() {
  try {
    await dbConnect();
    const now = new Date();
    const elections = await Election.find({
      endTime: { $lt: now },
    });

    const electionsWithVotes = await Promise.all(
      elections.map(async (election) => {
        const votes = await Vote.aggregate([
          { $match: { electionId: election._id } },
          { $group: { _id: "$party", count: { $sum: 1 } } },
        ]);
        return {
          ...election.toObject(),
          votes: votes.map((vote) => ({
            party: vote._id,
            count: vote.count,
          })),
        };
      })
    );

    return NextResponse.json({ elections: electionsWithVotes.reverse() });
  } catch (error) {
    console.log("Error While fetching the Elections ::", error.message);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 405 }
    );
  }
}
