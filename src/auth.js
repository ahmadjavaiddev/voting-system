import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import dbConnect from "./lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { authConfig } from "./auth.config";

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email", placeholder: "Email" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Password",
        },
      },
      authorize: async (credentials) => {
        await dbConnect();

        const user = await User.findOne({ email: credentials.email }).exec();
        if (!user) {
          console.log("No user found");
          throw new Error("Invalid credentials");
        }

        const valid = await bcrypt.compare(credentials.password, user.password);
        if (!valid) {
          throw new Error("Invalid credentials");
        }

        if (!user.isVerified || !user.isApproved) {
          throw new Error(
            "Email not verified or Account not approved by admin"
          );
        }

        console.log("User verified successfully");
        return {
          id: user._id,
          role: user.role,
        };
      },
    }),
  ],
});
