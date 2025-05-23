// import { auth } from "@auth/core";
// import { NextResponse } from "next/server";

// export default async function middleware(request) {
//   const session = await auth(request);
//   const { pathname } = request.nextUrl;

//   if ((pathname.startsWith("/user") || pathname.startsWith("/admin")) && !session?.user) {
//     return NextResponse.redirect(new URL("/login", request.url));
//   }

//   // Role-based redirects
//   if (pathname.startsWith("/user") && session?.user?.role !== "user") {
//     return NextResponse.redirect(new URL("/admin/dashboard", request.url));
//   }
//   if (pathname.startsWith("/admin") && session?.user?.role !== "admin") {
//     return NextResponse.redirect(new URL("/user/dashboard", request.url));
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/user/:path*", "/admin/:path*"],
// };

import NextAuth from "next-auth";
import { authConfig } from "./auth.config";

export default NextAuth(authConfig).auth;

export const config = {
  matcher: ["/user/:path*", "/admin/:path*", "/api/:path*"],
};
