import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Election from "@/models/Election";
import Candidate from "@/models/Candidate";

export async function GET() {
  try {
    await dbConnect();
    const elections = await Election.find()
      .populate(
        "candidates",
        "name image slogan color members description votes platform winner"
      )
      .lean();

    return NextResponse.json({ elections: elections.reverse() });
  } catch (error) {
    console.log("Error While fetching the Elections ::", error.message);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 405 }
    );
  }
}
