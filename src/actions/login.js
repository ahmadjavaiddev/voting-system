"use server";

import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";

export async function authenticate(prevState, formData) {
  try {
    // Convert FormData to plain object
    const credentials = Object.fromEntries(formData.entries());

    // Try to sign in without redirect
    const result = await signIn("credentials", {
      ...credentials,
      redirect: false,
    });

    if (result?.error) {
      return "Invalid credentials.";
    }

    // Get the callbackUrl if present
    const callbackUrl = credentials.redirectTo || credentials.callbackUrl;

    if (callbackUrl) {
      redirect(callbackUrl);
    } else {
      redirect("/dashboard");
    }
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
}
