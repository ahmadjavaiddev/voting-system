import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Election from "@/models/Election";

export async function GET(request, { params }) {
  try {
    const electionId = (await params).electionId;

    await dbConnect();
    const election = await Election.findById(electionId);

    return NextResponse.json({ election });
  } catch (error) {
    console.log("Error While fetching the Election ::", error.message);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 405 }
    );
  }
}
