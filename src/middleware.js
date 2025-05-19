import { NextResponse } from "next/server";
import { verifyJWT } from "./lib";

export async function middleware(request) {
  try {
    const { pathname } = request.nextUrl;

    // Apply protection to all /user and /admin routes (including nested)
    if (pathname.startsWith("/user") || pathname.startsWith("/admin")) {
      // Get JWT from cookies
      const token = request.cookies?.get("token")?.value;
      if (!token) {
        return NextResponse.redirect(new URL("/login", request.url));
      }

      const payload = await verifyJWT(token);
      if (!payload) {
        return NextResponse.redirect(new URL("/login", request.url));
      }

      // Protect /user routes
      if (pathname.startsWith("/user") && payload.role !== "user") {
        return NextResponse.redirect(new URL("/admin/dashboard", request.url));
      }

      // Protect /admin routes
      if (pathname.startsWith("/admin") && payload.role !== "admin") {
        return NextResponse.redirect(new URL("/user/dashboard", request.url));
      }

      return NextResponse.next();
    } else {
      return NextResponse.next();
    }
  } catch (error) {
    console.log("Error In Middleware ::", error.message);
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/user/:path*", "/admin/:path*"],
};
