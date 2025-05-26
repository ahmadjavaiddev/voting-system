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

      // Public routes
      const publicRoutes = ["/login", "/register"];

      // Redirect logged-in users from public routes to dashboard
      if (isLoggedIn && publicRoutes.includes(path)) {
        return Response.redirect(new URL("/dashboard", nextUrl));
      }

      // Protect dashboard route
      if (path.startsWith("/dashboard")) {
        if (!isLoggedIn) {
          return Response.redirect(new URL("/login", nextUrl));
        }
        // Allow access to dashboard for all roles
        return true;
      }

      return true;
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET || "secret",
  providers: [],
};
