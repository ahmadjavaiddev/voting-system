// emails/VerificationEmail.jsx
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

const VerificationEmail = ({ userName = "User", verificationUrl = "" }) => {
  return (
    <Html>
      <Head />
      <Body style={main}>
        <Container style={container}>
          <Section style={header}>
            <Text style={logo}>🚀 ElectionHub</Text>
          </Section>

          <Section style={content}>
            <Text style={title}>Verify Your Email Address</Text>

            <Text style={text}>
              Hello <strong>{userName}</strong>!
            </Text>

            <Text style={text}>
              Thank you for signing up! To complete your registration and secure
              your account, please verify your email address by clicking the
              button below.
            </Text>

            <Section style={buttonContainer}>
              <Button style={button} href={verificationUrl}>
                Verify Email Address
              </Button>
            </Section>

            <Text style={text}>
              This verification link will expire in <strong>24 hours</strong>{" "}
              for security reasons.
            </Text>

            <Hr style={hr} />

            <Text style={smallText}>
              If the button doesn't work, copy and paste this link into your
              browser:
            </Text>
            <Link href={verificationUrl} style={link}>
              {verificationUrl}
            </Link>

            <Section style={warningBox}>
              <Text style={warningText}>
                <strong>Security Notice:</strong> If you didn't create an
                account, please ignore this email. Your email address will not
                be added to our system.
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
  color: "#4F46E5",
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
  backgroundColor: "#4F46E5",
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
  color: "#4F46E5",
  fontSize: "14px",
  textDecoration: "underline",
  wordBreak: "break-all",
};

const warningBox = {
  backgroundColor: "#FEF2F2",
  border: "1px solid #FECACA",
  borderRadius: "8px",
  padding: "16px",
  margin: "24px 0",
};

const warningText = {
  fontSize: "14px",
  lineHeight: "1.5",
  color: "#B91C1C",
  margin: "0",
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

export default VerificationEmail;
