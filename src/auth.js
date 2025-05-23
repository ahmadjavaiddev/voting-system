import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import dbConnect from "./lib/db";
import User from "./models/User";
import bcrypt from "bcryptjs";

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(3) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          await dbConnect();
          const user = await User.findOne({ email: credentials.email }).exec();
          if (!user) {
            console.log("No user found");
            throw new Error("Invalid credentials");
          }

          const valid = await bcrypt.compare(
            credentials.password,
            user.password
          );
          if (!valid) {
            throw new Error("Invalid credentials");
          }

          if (!user.isVerified) {
            throw new Error("Email not verified");
          }

          if (!user.isApproved) {
            throw new Error("Account not approved by admin");
          }

          return {
            id: user._id,
            role: user.role,
          };
        } else {
          console.log("Invalid credentials");
          throw new Error("Invalid credentials");
        }
      },
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
    }),
  ],
});
