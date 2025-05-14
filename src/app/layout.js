import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 font-sans">
        <div className="container mx-auto px-4">{children}</div>
        <Toaster />
      </body>
    </html>
  );
}
