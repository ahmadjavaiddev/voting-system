import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Election from "@/models/Election";
import Candidate from "@/models/Candidate";

export async function GET() {
  try {
    await dbConnect();
    const now = new Date();
    const elections = await Election.find({
      startTime: { $lte: now },
      endTime: { $gte: now },
    })
      .populate("candidates")
      .exec();

    return NextResponse.json({ elections: elections.reverse() });
  } catch (error) {
    console.log("Error While fetching the Elections ::", error.message);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 405 }
    );
  }
}
