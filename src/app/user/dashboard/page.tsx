"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export default function UserDashboard() {
  const [liveElections, setLiveElections] = useState([]);
  const [history, setHistory] = useState([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("/api/elections/live")
      .then((res) => res.json())
      .then((data) => setLiveElections(data.elections || []));
    fetch("/api/elections/history")
      .then((res) => res.json())
      .then((data) => setHistory(data.elections || []));
  }, []);

  const handleVote = async (electionId: string, party: string) => {
    setLoading(true);
    setMessage("");
    setError("");
    try {
      const res = await fetch("/api/vote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ electionId, party }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage(data.message);
      } else {
        setError(data.error || "Vote failed");
      }
    } catch {
      setError("Vote failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-6">User Dashboard</h2>
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-2">Live Elections</h3>
        {liveElections.length === 0 && <div>No live elections.</div>}
        {liveElections.map((election: any) => (
          <div key={election._id} className="mb-4 p-4 bg-white rounded shadow">
            <div className="font-semibold">{election.title}</div>
            <div className="text-sm text-gray-500 mb-2">
              {new Date(election.startTime).toLocaleString()} - {new Date(election.endTime).toLocaleString()}
            </div>
            <div className="flex gap-2 flex-wrap">
              {election.parties.map((party: string) => (
                <Button
                  key={party}
                  onClick={() => handleVote(election._id, party)}
                  disabled={loading}
                >
                  Vote {party}
                </Button>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-2">Election History</h3>
        {history.length === 0 && <div>No past elections.</div>}
        {history.map((election: any) => (
          <div key={election._id} className="mb-4 p-4 bg-gray-100 rounded">
            <div className="font-semibold">{election.title}</div>
            <div className="text-sm text-gray-500">
              {new Date(election.startTime).toLocaleString()} - {new Date(election.endTime).toLocaleString()}
            </div>
          </div>
        ))}
      </div>
      {message && <div className="text-green-600 mb-4">{message}</div>}
      {error && <div className="text-red-600 mb-4">{error}</div>}
    </div>
  );
} 