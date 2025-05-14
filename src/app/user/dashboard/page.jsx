// "use client";
// import { useEffect, useState } from "react";
// import { Button } from "@/components/ui/button";

// export default function UserDashboard() {
//   const [liveElections, setLiveElections] = useState([]);
//   const [history, setHistory] = useState([]);
//   const [message, setMessage] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     fetch("/api/elections/live")
//       .then((res) => res.json())
//       .then((data) => setLiveElections(data.elections || []));
//     fetch("/api/elections/history")
//       .then((res) => res.json())
//       .then((data) => setHistory(data.elections || []));
//   }, []);

//   const handleVote = async (electionId: string, party: string) => {
//     setLoading(true);
//     setMessage("");
//     setError("");
//     try {
//       const res = await fetch("/api/vote", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ electionId, party }),
//       });
//       const data = await res.json();
//       if (res.ok) {
//         setMessage(data.message);
//       } else {
//         setError(data.error || "Vote failed");
//       }
//     } catch {
//       setError("Vote failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="mx-auto mt-10">
//       <h2 className="text-2xl font-bold mb-6">User Dashboard</h2>
//       <div className="mb-8">
//         <h3 className="text-xl font-semibold mb-2">Live Elections</h3>
//         {liveElections.length === 0 && <div>No live elections.</div>}
//         {liveElections.map((election: any) => (
//           <div key={election._id} className="mb-4 p-4 bg-white rounded shadow">
//             <div className="font-semibold">{election.title}</div>
//             <div className="text-sm text-gray-500 mb-2">
//               {new Date(election.startTime).toLocaleString()} -{" "}
//               {new Date(election.endTime).toLocaleString()}
//             </div>
//             <div className="flex gap-2 flex-wrap">
//               {election.parties.map((party: string) => (
//                 <Button
//                   key={party}
//                   onClick={() => handleVote(election._id, party)}
//                   disabled={loading}
//                 >
//                   Vote {party}
//                 </Button>
//               ))}
//             </div>
//           </div>
//         ))}
//       </div>
//       <div className="mb-8">
//         <h3 className="text-xl font-semibold mb-2">Election History</h3>
//         {history.length === 0 && <div>No past elections.</div>}
//         {history.map((election: any) => (
//           <div key={election._id} className="mb-4 p-4 bg-gray-100 rounded">
//             <div className="font-semibold">{election.title}</div>
//             <div className="text-sm text-gray-500">
//               {new Date(election.startTime).toLocaleString()} -{" "}
//               {new Date(election.endTime).toLocaleString()}
//             </div>
//           </div>
//         ))}
//       </div>
//       {message && <div className="text-green-600 mb-4">{message}</div>}
//       {error && <div className="text-red-600 mb-4">{error}</div>}
//     </div>
//   );
// }

"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  CalendarClock,
  CheckCircle2,
  ChevronRight,
  Clock,
  History,
} from "lucide-react";
import {
  formatDate,
  getTimeRemaining,
  getTimeLeft,
  mockElections,
} from "@/lib/index";
import LiveElectionCard from "@/components/general/LiveElectionCard";
import UpcomingElectionCard from "@/components/general/UpcomingElectionCard";

export default function UserDashboard() {
  const [liveElections, setLiveElections] = useState([]);
  const [history, setHistory] = useState([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Filter elections based on search query
  const filterElections = (elections) => {
    if (!searchQuery) return elections;
    return elections.filter(
      (election) =>
        election.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        election.parties.some((party) =>
          party.toLowerCase().includes(searchQuery.toLowerCase())
        )
    );
  };

  useEffect(() => {
    fetch("/api/elections/live")
      .then((res) => res.json())
      .then((data) => setLiveElections(data.elections || []));
    fetch("/api/elections/history")
      .then((res) => res.json())
      .then((data) => setHistory(data.elections || []));
  }, []);

  const handleVote = async (electionId, party) => {
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
    <main className="container mx-auto p-4 md:p-6">
      <Tabs defaultValue="live" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="live" className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span>Live Elections</span>
          </TabsTrigger>
          <TabsTrigger value="upcoming" className="flex items-center gap-2">
            <CalendarClock className="h-4 w-4" />
            <span>Upcoming</span>
          </TabsTrigger>
          <TabsTrigger value="previous" className="flex items-center gap-2">
            <History className="h-4 w-4" />
            <span>Previous</span>
          </TabsTrigger>
        </TabsList>

        {/* Live Elections */}
        <TabsContent value="live" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filterElections(mockElections.live).length > 0 ? (
              filterElections(mockElections.live).map((election) => (
                <LiveElectionCard election={election} key={election.id} />
              ))
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
                <div className="rounded-full bg-muted p-3">
                  <Clock className="h-6 w-6 text-muted-foreground" />
                </div>
                <h3 className="mt-4 text-lg font-medium">
                  No live elections found
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {searchQuery
                    ? "Try a different search term"
                    : "Check back later for live elections"}
                </p>
              </div>
            )}
          </div>
        </TabsContent>

        {/* Upcoming Elections */}
        <TabsContent value="upcoming" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filterElections(mockElections.upcoming).length > 0 ? (
              filterElections(mockElections.upcoming).map((election) => (
                <UpcomingElectionCard election={election} key={election.id} />
              ))
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
                <div className="rounded-full bg-muted p-3">
                  <CalendarClock className="h-6 w-6 text-muted-foreground" />
                </div>
                <h3 className="mt-4 text-lg font-medium">
                  No upcoming elections found
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {searchQuery
                    ? "Try a different search term"
                    : "Check back later for upcoming elections"}
                </p>
              </div>
            )}
          </div>
        </TabsContent>

        {/* Previous Elections */}
        <TabsContent value="previous" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filterElections(mockElections.previous).length > 0 ? (
              filterElections(mockElections.previous).map((election) => (
                <Card key={election.id} className="overflow-hidden">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <CardTitle className="line-clamp-1">
                        {election.title}
                      </CardTitle>
                      <Badge
                        variant="outline"
                        className="bg-gray-100 text-gray-800 hover:bg-gray-200 border-gray-200"
                      >
                        Completed
                      </Badge>
                    </div>
                    <CardDescription>
                      {election.parties.length} candidates • {election.votes}{" "}
                      total votes
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Winner:</span>
                        <span className="font-medium text-green-600 flex items-center">
                          {election.winner}{" "}
                          <CheckCircle2 className="ml-1 h-4 w-4" />
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Started:</span>
                        <span>{formatDate(election.startTime)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Ended:</span>
                        <span>{formatDate(election.endTime)}</span>
                      </div>
                      <div className="mt-2">
                        <p className="text-sm font-medium mb-1">Candidates:</p>
                        <div className="flex flex-wrap gap-2">
                          {election.parties.map((party, index) => (
                            <Badge
                              key={index}
                              variant="outline"
                              className={
                                party === election.winner
                                  ? "bg-green-100 text-green-800 border-green-200"
                                  : "bg-background"
                              }
                            >
                              {party}{" "}
                              {party === election.winner && (
                                <CheckCircle2 className="ml-1 h-3 w-3" />
                              )}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      variant="outline"
                      className="w-full flex items-center justify-center"
                    >
                      View Results <ChevronRight className="ml-1 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
                <div className="rounded-full bg-muted p-3">
                  <History className="h-6 w-6 text-muted-foreground" />
                </div>
                <h3 className="mt-4 text-lg font-medium">
                  No previous elections found
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {searchQuery
                    ? "Try a different search term"
                    : "Your election history will appear here"}
                </p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </main>
  );
}
