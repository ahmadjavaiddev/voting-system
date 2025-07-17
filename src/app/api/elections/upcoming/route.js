import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Election from "@/models/Election";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

export async function GET() {
  try {
    await dbConnect();
    const now = new Date();
    const elections = await Election.find({
      startTime: { $gt: now },
    })
      .populate(
        "candidates",
        "name image slogan color members description votes platform winner"
      )
      .lean();

    return NextResponse.json({ elections });
  } catch (error) {
    console.log("Error While fetching the Elections ::", error.message);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 405 }
    );
  }
}
