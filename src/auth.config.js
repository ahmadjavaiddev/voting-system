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
      const userRole = auth?.user?.role;
      const path = nextUrl.pathname;

      // Define protected routes
      const adminRoutes = [
        "/admin",
        "/admin/dashboard",
        "/admin/election/create",
        "/admin/election/results",
      ];
      const userRoutes = ["/user", "/user/dashboard", "/user/election/results"];
      const publicRoutes = ["/login", "/register"];

      // Redirect logged-in users from public routes
      if (isLoggedIn && publicRoutes.includes(path)) {
        return Response.redirect(
          new URL(
            userRole === "admin" ? "/admin/dashboard" : "/user/dashboard",
            nextUrl
          )
        );
      }

      // Handle admin routes
      if (adminRoutes.some((route) => path.startsWith(route))) {
        if (!isLoggedIn) return false; // Automatically redirects to /login
        if (userRole !== "admin") {
          return Response.redirect(new URL("/user/dashboard", nextUrl));
        }
        return true;
      }

      // Handle user routes
      if (userRoutes.some((route) => path.startsWith(route))) {
        if (!isLoggedIn) return false;
        if (userRole !== "user") {
          return Response.redirect(new URL("/admin/dashboard", nextUrl));
        }
        return true;
      }

      return true;
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.AUTH_SECRET || "secret",
  providers: [],
};
