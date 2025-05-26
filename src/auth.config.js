export const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = {
          ...session.user,
          id: token.id,
          role: token.role,
        };
      }
      return session;
    },
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const path = nextUrl.pathname;

      const publicRoutes = ["/login", "/register"];
      const publicApiRoutes = [
        "/api/auth",
        "/api/register",
        "/api/login",
        "/api/verify-email",
      ];

      if (publicRoutes.includes(path)) {
        if (isLoggedIn) {
          return Response.redirect(new URL("/dashboard", nextUrl));
        }
        return true;
      }

      if (publicApiRoutes.some((route) => path.startsWith(route))) {
        return true;
      }

      // From this point onwards, all routes are protected (pages or API)
      if (!isLoggedIn) {
        console.log(`Unauthorized access attempt to protected route: ${path}`);
        return false;
      }

      const userRole = auth?.user?.role;
      const adminApiRoutes = ["/api/admin", "/api/admin/create-election"];

      if (adminApiRoutes.some((route) => path.startsWith(route))) {
        if (userRole === "admin") {
          console.log(`Admin access granted to ${path}`);
          return true;
        } else {
          console.log(
            `Access denied for user (role: ${userRole}) to admin route ${path}`
          );
          return false;
        }
      }

      console.log(
        `User (role: ${userRole}) access granted to protected route: ${path}`
      );
      return true;
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET || "secret",
  providers: [],
};
