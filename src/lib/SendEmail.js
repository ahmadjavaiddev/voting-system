// lib/email.js - Email service with React Email components
import { Resend } from "resend";
import { render } from "@react-email/components";
import VerificationEmail from "@/emails/VerificationEmail";
import WelcomeEmail from "@/emails/WelcomeEmail";
import PasswordResetEmail from "@/emails/PasswordResetEmail";
import React from "react";

const resend = new Resend(process.env.RESEND_API_KEY);

export const emailService = {
  // Send verification email
  async sendVerificationEmail(to, verificationToken, userName) {
    try {
      const verificationUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/verify-email?token=${verificationToken}`;

      const emailHtml = await render(
        React.createElement(VerificationEmail, {
          userName,
          verificationUrl,
        })
      );

      const data = await resend.emails.send({
        from: process.env.FROM_EMAIL || "onboarding@resend.dev",
        to: [to],
        subject: "Verify Your Email Address",
        html: emailHtml,
      });

      return { success: true, data };
    } catch (error) {
      console.error("Verification email error:", error);
      return { success: false, error: error.message };
    }
  },

  // Send welcome email after verification
  async sendWelcomeEmail(to, userName) {
    try {
      const emailHtml = render(WelcomeEmail({ userName }));

      const data = await resend.emails.send({
        from: process.env.FROM_EMAIL || "onboarding@resend.dev",
        to: [to],
        subject: "Welcome to Our Platform!",
        html: emailHtml,
      });

      return { success: true, data };
    } catch (error) {
      console.error("Welcome email error:", error);
      return { success: false, error: error.message };
    }
  },

  // Send password reset email
  async sendPasswordResetEmail(to, resetToken, userName) {
    try {
      const resetUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/reset-password?token=${resetToken}`;

      const emailHtml = render(
        PasswordResetEmail({
          userName,
          resetUrl,
        })
      );

      const data = await resend.emails.send({
        from: process.env.FROM_EMAIL || "onboarding@resend.dev",
        to: [to],
        subject: "Reset Your Password",
        html: emailHtml,
      });

      return { success: true, data };
    } catch (error) {
      console.error("Password reset email error:", error);
      return { success: false, error: error.message };
    }
  },
};

// Utility function to generate verification token
export function generateVerificationToken() {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15) +
    Date.now().toString(36)
  );
}

// Utility function to generate password reset token
export function generateResetToken() {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15) +
    Date.now().toString(36)
  );
}
