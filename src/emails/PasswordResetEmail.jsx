// emails/PasswordResetEmail.jsx
import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Link,
  Button,
  Hr,
} from "@react-email/components";

const PasswordResetEmail = ({ userName = "User", resetUrl = "" }) => {
  return (
    <Html>
      <Head />
      <Body style={main}>
        <Container style={container}>
          <Section style={header}>
            <Text style={logo}>🔐 Your App Name</Text>
          </Section>

          <Section style={content}>
            <Text style={title}>Reset Your Password</Text>

            <Text style={text}>
              Hello <strong>{userName}</strong>!
            </Text>

            <Text style={text}>
              We received a request to reset your password. If you made this
              request, click the button below to create a new password.
            </Text>

            <Section style={buttonContainer}>
              <Button style={button} href={resetUrl}>
                Reset Password
              </Button>
            </Section>

            <Text style={text}>
              This reset link will expire in <strong>1 hour</strong> for
              security reasons.
            </Text>

            <Section style={warningBox}>
              <Text style={warningText}>
                If you didn't request a password reset, please ignore this
                email. Your password will remain unchanged and your account will
                stay secure.
              </Text>
            </Section>

            <Hr style={hr} />

            <Text style={smallText}>
              If the button doesn't work, copy and paste this link into your
              browser:
            </Text>
            <Link href={resetUrl} style={link}>
              {resetUrl}
            </Link>

            <Section style={securityTips}>
              <Text style={securityTitle}>Security Tips:</Text>
              <Text style={securityItem}>• Use a strong, unique password</Text>
              <Text style={securityItem}>
                • Don't share your password with anyone
              </Text>
              <Text style={securityItem}>
                • Enable two-factor authentication if available
              </Text>
            </Section>
          </Section>

          <Section style={footer}>
            <Text style={footerText}>
              This email was sent from a notification-only address. Please do
              not reply to this message.
            </Text>
            <Text style={footerText}>
              © 2025 Your App Name. All rights reserved.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

// Styles
const main = {
  backgroundColor: "#f6f9fc",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "20px 0 48px",
  marginBottom: "64px",
  maxWidth: "600px",
};

const header = {
  padding: "20px 0",
  textAlign: "center",
};

const logo = {
  fontSize: "28px",
  fontWeight: "bold",
  color: "#EF4444",
  margin: "0",
};

const content = {
  padding: "0 48px",
};

const title = {
  fontSize: "24px",
  lineHeight: "1.25",
  fontWeight: "600",
  color: "#1f2937",
  textAlign: "center",
  margin: "30px 0",
};

const text = {
  fontSize: "16px",
  lineHeight: "1.5",
  color: "#374151",
  margin: "16px 0",
};

const buttonContainer = {
  textAlign: "center",
  margin: "32px 0",
};

const button = {
  backgroundColor: "#EF4444",
  borderRadius: "8px",
  color: "#ffffff",
  fontSize: "16px",
  fontWeight: "600",
  textDecoration: "none",
  textAlign: "center",
  display: "inline-block",
  padding: "12px 32px",
  lineHeight: "1.25",
};

const warningBox = {
  backgroundColor: "#FEF3C7",
  border: "1px solid #FCD34D",
  borderRadius: "8px",
  padding: "16px",
  margin: "24px 0",
};

const warningText = {
  fontSize: "14px",
  lineHeight: "1.5",
  color: "#92400E",
  margin: "0",
};

const hr = {
  borderColor: "#e5e7eb",
  margin: "32px 0",
};

const smallText = {
  fontSize: "14px",
  lineHeight: "1.5",
  color: "#6b7280",
  margin: "16px 0 8px",
};

const link = {
  color: "#EF4444",
  fontSize: "14px",
  textDecoration: "underline",
  wordBreak: "break-all",
};

const securityTips = {
  backgroundColor: "#F3F4F6",
  borderRadius: "8px",
  padding: "16px",
  margin: "24px 0",
};

const securityTitle = {
  fontSize: "14px",
  fontWeight: "600",
  color: "#374151",
  margin: "0 0 8px 0",
};

const securityItem = {
  fontSize: "13px",
  lineHeight: "1.5",
  color: "#6B7280",
  margin: "4px 0",
};

const footer = {
  padding: "20px 48px",
  textAlign: "center",
};

const footerText = {
  fontSize: "12px",
  lineHeight: "1.5",
  color: "#6b7280",
  margin: "8px 0",
};

export default PasswordResetEmail;
