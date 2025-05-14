"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = searchParams.get("token");
    if (!token) {
      setError("No token provided.");
      setLoading(false);
      return;
    }
    fetch("/api/auth/verify-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    })
      .then(async (res) => {
        const data = await res.json();
        if (res.ok) setMessage(data.message);
        else setError(data.error || "Verification failed");
      })
      .catch(() => setError("Verification failed"))
      .finally(() => setLoading(false));
  }, [searchParams]);

  return (
    <div className="max-w-md mx-auto mt-16 bg-white p-8 rounded shadow text-center">
      <h2 className="text-2xl font-bold mb-6">Verify Email</h2>
      {loading && <div>Verifying...</div>}
      {message && <div className="text-green-600">{message}</div>}
      {error && <div className="text-red-600">{error}</div>}
      <div className="mt-6">
        <a href="/login"><Button>Go to Login</Button></a>
      </div>
    </div>
  );
} 