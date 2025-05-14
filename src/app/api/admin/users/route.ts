import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import User from "@/models/User";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "secret";

function getToken(req: NextRequest) {
  console.log("req.headers ::", req.headers);
  const auth = req.headers.get("cookie");
  if (!auth) return null;
  return auth.replace("token=", "");
}

export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    const token = getToken(req);
    console.log("token ::", token);
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    let payload = jwt.verify(token, JWT_SECRET) as any;
    if (!payload) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    if (payload.role !== "admin") {
      console.log("role");
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const users = await User.find({});
    if (users.length === 0) {
      return NextResponse.json({ error: "No Users Found" });
    }

    return NextResponse.json({ users });
  } catch (error) {
    console.log("Error in the Admin/Users");
  }
}
