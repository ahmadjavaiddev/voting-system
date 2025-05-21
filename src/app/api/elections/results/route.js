import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Election from "@/models/Election";

export async function GET() {
  try {
    await dbConnect();
    const elections = await Election.find().populate(
      "candidates",
      "name image slogan members description votes platform winner"
    );

    return NextResponse.json({ elections: elections.reverse() });
  } catch (error) {
    console.log("Error While fetching the Elections ::", error.message);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 405 }
    );
  }
}
