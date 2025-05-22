import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Election from "@/models/Election";

export async function GET() {
  await dbConnect();
  const elections = await Election.find({ status: "ended" });
  return NextResponse.json({ elections });
}
