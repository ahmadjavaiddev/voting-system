// emails/WelcomeEmail.jsx
import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Button,
  Hr,
} from "@react-email/components";

const WelcomeEmail = ({ userName = "User" }) => {
  return (
    <Html>
      <Head />
      <Body style={main}>
        <Container style={container}>
          <Section style={header}>
            <Text style={logo}>🎉 Your App Name</Text>
          </Section>

          <Section style={content}>
            <Text style={title}>Welcome to Our Platform!</Text>

            <Text style={text}>
              Hello <strong>{userName}</strong>!
            </Text>

            <Text style={text}>
              Your email has been successfully verified! Welcome to our
              community. We're excited to have you on board.
            </Text>

            <Section style={featuresBox}>
              <Text style={featuresTitle}>Here's what you can do next:</Text>
              <Text style={featureItem}>✨ Complete your profile setup</Text>
              <Text style={featureItem}>🔍 Explore our features and tools</Text>
              <Text style={featureItem}>🤝 Connect with other users</Text>
              <Text style={featureItem}>📚 Access our learning resources</Text>
            </Section>

            <Section style={buttonContainer}>
              <Button
                style={button}
                href={`${process.env.NEXT_PUBLIC_BASE_URL}/dashboard`}
              >
                Get Started
              </Button>
            </Section>

            <Text style={text}>
              If you have any questions or need help getting started, feel free
              to reach out to our support team.
            </Text>

            <Hr style={hr} />

            <Text style={smallText}>
              Need help? Contact us at support@yourapp.com
            </Text>
          </Section>

          <Section style={footer}>
            <Text style={footerText}>
              You're receiving this email because you recently created an
              account.
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
  color: "#10B981",
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

const featuresBox = {
  backgroundColor: "#F0FDF4",
  border: "1px solid #BBF7D0",
  borderRadius: "8px",
  padding: "24px",
  margin: "24px 0",
};

const featuresTitle = {
  fontSize: "16px",
  fontWeight: "600",
  color: "#166534",
  margin: "0 0 16px 0",
};

const featureItem = {
  fontSize: "14px",
  lineHeight: "1.5",
  color: "#166534",
  margin: "8px 0",
};

const buttonContainer = {
  textAlign: "center",
  margin: "32px 0",
};

const button = {
  backgroundColor: "#10B981",
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
  margin: "16px 0",
  textAlign: "center",
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

export default WelcomeEmail;
