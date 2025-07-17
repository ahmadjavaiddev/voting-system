import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Vote, User, Lock, BarChart2 } from "lucide-react";

export default function Home() {
  const features = [
    {
      icon: <Vote className="w-6 h-6" />,
      title: "Secure Voting",
      description: "Cast your vote securely with our blockchain-based system.",
    },
    {
      icon: <User className="w-6 h-6" />,
      title: "User Friendly",
      description: "Simple and intuitive interface for all users.",
    },
    {
      icon: <Lock className="w-6 h-6" />,
      title: "End-to-End Encryption",
      description: "Your vote remains confidential and secure.",
    },
    {
      icon: <BarChart2 className="w-6 h-6" />,
      title: "Real-time Results",
      description: "View live election results as they come in.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Section */}
      <main className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-700 text-sm font-medium mb-6">
            <Vote className="w-4 h-4" />
            <span>Secure Online Voting Platform</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Modern, Secure & Transparent
            <span className="text-blue-600 block mt-2">Voting System</span>
          </h1>

          <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto">
            Experience the future of democratic voting with our secure,
            transparent, and accessible online voting platform.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-20">
            <Link href="/register" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto">
                Get Started
              </Button>
            </Link>
            <Link href="/login" className="w-full sm:w-auto">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Sign In
              </Button>
            </Link>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white flex flex-col items-center justify-center p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className="w-12 h-12 flex items-center justify-center bg-blue-50 rounded-lg text-blue-600 mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
