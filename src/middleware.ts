// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";
// import jwt from "jsonwebtoken";

// const JWT_SECRET = process.env.JWT_SECRET || "secret";

// const PROTECTED_PATHS = [
//   "/admin",
//   "/user",
//   "/user/dashboard",
//   "/admin/dashboard",
// ];

// export function middleware(request: NextRequest) {
//   try {
//     const { pathname } = request.nextUrl;

//     if (PROTECTED_PATHS.includes(pathname)) {
//       // Get JWT from cookies
//       const token = request.cookies.get("token")?.value;
//       if (!token) {
//         return NextResponse.redirect(new URL("/login", request.url));
//       }

//       let payload: any = jwt.verify(token, JWT_SECRET);
//       if (!payload) {
//         return NextResponse.redirect(new URL("/login", request.url));
//       }

//       console.log("payload ::", payload);
//       // Protect /user/dashboard
//       if (pathname.startsWith("/user")) {
//         if (payload.role !== "user") {
//           return NextResponse.redirect(
//             new URL("/admin/dashboard", request.url)
//           );
//         }
//       }

//       // Protect /admin/dashboard
//       if (pathname.startsWith("/admin")) {
//         console.log("redirecting to the admin");
//         if (payload.role !== "admin") {
//           return NextResponse.redirect(new URL("/user/dashboard", request.url));
//         }
//       }

//       return NextResponse.next();
//     } else {
//       return NextResponse.next();
//     }
//   } catch (error) {
//     console.log("Error In Middleware ::", error.message);
//   }
// }

// export const config = {
//   matcher: ["/user/:path*", "/admin/:path*"],
// };

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = process.env.JWT_SECRET || "secret";

const PROTECTED_PATHS = [
  "/admin",
  "/user",
  "/user/dashboard",
  "/admin/dashboard",
];

async function verifyJWT(token: string) {
  const secret = new TextEncoder().encode(JWT_SECRET);
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload;
  } catch {
    return null;
  }
}

export async function middleware(request: NextRequest) {
  try {
    const { pathname } = request.nextUrl;

    if (PROTECTED_PATHS.includes(pathname)) {
      // Get JWT from cookies
      const token = request.cookies.get("token")?.value;
      if (!token) {
        return NextResponse.redirect(new URL("/login", request.url));
      }

      const payload: any = await verifyJWT(token);
      if (!payload) {
        return NextResponse.redirect(new URL("/login", request.url));
      }

      // Protect /user/dashboard
      if (pathname.startsWith("/user")) {
        if (payload.role !== "user") {
          return NextResponse.redirect(
            new URL("/admin/dashboard", request.url)
          );
        }
      }

      // Protect /admin/dashboard
      if (pathname.startsWith("/admin")) {
        if (payload.role !== "admin") {
          return NextResponse.redirect(new URL("/user/dashboard", request.url));
        }
      }

      return NextResponse.next();
    } else {
      return NextResponse.next();
    }
  } catch (error: any) {
    console.log("Error In Middleware ::", error.message);
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/user/:path*", "/admin/:path*"],
};
