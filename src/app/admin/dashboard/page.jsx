"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { ElectionCreate } from "@/components/custom/election-create";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [electionId, setElectionId] = useState("");
  const [open, setOpen] = useState(false);

  // Fetch unapproved users (for demo, fetch all users and filter client-side)
  useEffect(() => {
    const fetchUsers = async () => {
      const res = await axios.get("/api/admin/users");
      const data = res.data;
      setUsers(data.users || []);
    };
    fetchUsers();
  }, []);

  // const handleApprove = async (userId) => {
  //   setLoading(true);
  //   setMessage("");
  //   setError("");
  //   try {
  //     const res = await axios.post("/api/admin/approve-user", { userId });
  //     const data = res.data;
  //     setMessage(data.message);
  //     setUsers(users.filter((u) => u._id !== userId));
  //   } catch (err) {
  //     setError(err.response?.data?.error || "Approval failed");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleGetResults = async () => {
    setLoading(true);
    setResults(null);
    setError("");
    try {
      const res = await axios.post("/api/admin/results", { electionId });
      const data = res.data;
      setResults(data.results);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to fetch results");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-6">Admin Dashboard</h2>
      {/* <div className="mb-8">
        <h3 className="text-xl font-semibold mb-2">Approve Users</h3>
        {users.filter((u) => !u.isApproved && u.isVerified).length === 0 && (
          <div>No users to approve.</div>
        )}
        {users
          .filter((u) => !u.isApproved && u.isVerified)
          .map((user) => (
            <div
              key={user._id}
              className="mb-2 flex items-center justify-between bg-white p-2 rounded shadow"
            >
              <span>
                {user.name} ({user.email})
              </span>
              <Button
                onClick={() => handleApprove(user._id)}
                disabled={loading}
              >
                Approve
              </Button>
            </div>
          ))}
      </div> */}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger>Open</DialogTrigger>
        <DialogContent>
          <DialogTitle></DialogTitle>
          <ElectionCreate handleClose={handleClose} />
        </DialogContent>
      </Dialog>

      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-2">Live Results</h3>
        <input
          className="w-full border rounded px-3 py-2 mb-2"
          placeholder="Election ID"
          value={electionId}
          onChange={(e) => setElectionId(e.target.value)}
        />
        <Button onClick={handleGetResults} disabled={loading || !electionId}>
          Get Results
        </Button>
        {results && (
          <div className="mt-4 bg-white p-4 rounded shadow">
            <h4 className="font-semibold mb-2">Results</h4>
            <ul>
              {Object.entries(results).map(([party, count]) => (
                <li key={party}>
                  {party}: {count}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      {message && <div className="text-green-600 mb-4">{message}</div>}
      {error && <div className="text-red-600 mb-4">{error}</div>}
    </div>
  );
}
