import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Election from "@/models/Election";

export const dynamic = "force-dynamic"; // always SSR :contentReference[oaicite:5]{index=5}
export const revalidate = 0; // zero‑second ISR :contentReference[oaicite:6]{index=6}
export const fetchCache = "force-no-store"; // no internal fetch caching :contentReference[oaicite:7]{index=7}

export async function GET() {
  try {
    await dbConnect();
    const now = new Date();
    const elections = await Election.find({
      startTime: { $gt: now },
    });

    return NextResponse.json({ elections });
  } catch (error) {
    console.log("Error While fetching the Elections ::", error.message);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 405 }
    );
  }
}
