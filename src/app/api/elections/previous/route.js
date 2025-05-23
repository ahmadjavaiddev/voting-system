import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Election from "@/models/Election";
import Candidate from "@/models/Candidate"; // Add this import

export async function GET() {
  try {
    await dbConnect();
    const now = new Date();
    const elections = await Election.find({
      endTime: { $lt: now },
    })
      .populate("candidates")
      .exec();

    return NextResponse.json({ elections: elections.reverse() });
  } catch (error) {
    console.log("/api/elections/previous ::", error.message);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 405 }
    );
  }
}
