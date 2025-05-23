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
        session.user.id = token.id;
        session.user.role = token.role;
      }
      return session;
    },
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isAdmin = auth?.user?.role === "admin";
      const isUser = auth?.user?.role === "user";
      const isLoginPage = nextUrl.pathname === "/login";
      const isAdminDashboard = nextUrl.pathname.startsWith("/admin");
      const isUserDashboard = nextUrl.pathname.startsWith("/user");
      console.log("Executing auth");

      // Redirect logged-in users away from login page to their dashboard
      if (isLoginPage && isLoggedIn) {
        if (isAdmin) {
          return Response.redirect(new URL("/admin/dashboard", nextUrl));
        }
        if (isUser) {
          return Response.redirect(new URL("/user/dashboard", nextUrl));
        }
      }

      // Block access to /admin for non-admins
      if (isAdminDashboard && (!isLoggedIn || !isAdmin)) {
        console.log("Executing to login");
        return Response.redirect(new URL("/login", nextUrl));
      }
      // Block access to /user for non-users
      if (isUserDashboard && (!isLoggedIn || !isUser)) {
        console.log("Executing to login user");
        return Response.redirect(new URL("/login", nextUrl));
      }

      // Allow access to all other pages
      return true;
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.AUTH_SECRET || "secret",
  providers: [], // Add providers with an empty array for now
};
