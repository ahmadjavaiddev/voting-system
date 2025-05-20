"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowUpDown,
  CheckCircle,
  Clock,
  Download,
  Filter,
  History,
  Info,
  Search,
  Share2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import moment from "moment";
import axios from "axios";

// Mock data for elections
const liveElections = [
  {
    id: 1,
    title: "Student Council Election 2025",
    description:
      "Annual election for the Student Council representatives who will serve for the 2025-2026 academic year.",
    startTime: "2025-05-10T09:00:00",
    endTime: "2025-05-15T18:00:00",
    status: "live",
    totalVotes: 256,
    eligibleVoters: 1200,
    lastUpdated: "2025-05-12T14:30:00",
    candidates: [
      {
        id: 1,
        name: "Progress Party",
        slogan: "Building a Better Tomorrow",
        color: "bg-blue-500",
        votes: 98,
      },
      {
        id: 2,
        name: "Student Voice",
        slogan: "Your Campus, Your Voice",
        color: "bg-green-500",
        votes: 87,
      },
      {
        id: 3,
        name: "Unity Coalition",
        slogan: "Together We Achieve More",
        color: "bg-purple-500",
        votes: 71,
      },
    ],
    hourlyData: [
      { hour: "9 AM", votes: 12 },
      { hour: "10 AM", votes: 18 },
      { hour: "11 AM", votes: 25 },
      { hour: "12 PM", votes: 30 },
      { hour: "1 PM", votes: 22 },
      { hour: "2 PM", votes: 35 },
      { hour: "3 PM", votes: 42 },
      { hour: "4 PM", votes: 38 },
      { hour: "5 PM", votes: 34 },
    ],
  },
  {
    id: 2,
    title: "Community Board Election",
    description:
      "Election for the community board representatives for the upcoming year.",
    startTime: "2025-05-12T10:00:00",
    endTime: "2025-05-16T20:00:00",
    status: "live",
    totalVotes: 124,
    eligibleVoters: 500,
    lastUpdated: "2025-05-12T15:45:00",
    candidates: [
      {
        id: 1,
        name: "Group 1",
        slogan: "Community First",
        color: "bg-amber-500",
        votes: 45,
      },
      {
        id: 2,
        name: "Group 2",
        slogan: "Building Bridges",
        color: "bg-red-500",
        votes: 42,
      },
      {
        id: 3,
        name: "Independent",
        slogan: "Fresh Perspective",
        color: "bg-teal-500",
        votes: 37,
      },
    ],
    hourlyData: [
      { hour: "10 AM", votes: 8 },
      { hour: "11 AM", votes: 12 },
      { hour: "12 PM", votes: 15 },
      { hour: "1 PM", votes: 18 },
      { hour: "2 PM", votes: 22 },
      { hour: "3 PM", votes: 19 },
      { hour: "4 PM", votes: 16 },
      { hour: "5 PM", votes: 14 },
    ],
  },
];

const previousElections = [
  {
    id: 3,
    title: "Faculty Senate Election",
    description:
      "Election for faculty senate representatives from different departments.",
    startTime: "2025-04-01T08:00:00",
    endTime: "2025-04-05T17:00:00",
    status: "completed",
    totalVotes: 532,
    eligibleVoters: 650,
    lastUpdated: "2025-04-05T17:30:00",
    winner: "Sciences",
    candidates: [
      {
        id: 1,
        name: "Liberal Arts",
        slogan: "Humanities Matter",
        color: "bg-pink-500",
        votes: 156,
      },
      {
        id: 2,
        name: "Sciences",
        slogan: "Data-Driven Decisions",
        color: "bg-cyan-500",
        votes: 215,
      },
      {
        id: 3,
        name: "Engineering",
        slogan: "Building the Future",
        color: "bg-orange-500",
        votes: 161,
      },
    ],
  },
  {
    id: 4,
    title: "Dormitory Representative",
    description: "Election for dormitory representatives for student housing.",
    startTime: "2025-04-10T09:00:00",
    endTime: "2025-04-12T18:00:00",
    status: "completed",
    totalVotes: 348,
    eligibleVoters: 450,
    lastUpdated: "2025-04-12T18:30:00",
    winner: "East Block",
    candidates: [
      {
        id: 1,
        name: "North Block",
        slogan: "Northern Pride",
        color: "bg-blue-500",
        votes: 98,
      },
      {
        id: 2,
        name: "South Block",
        slogan: "Southern Hospitality",
        color: "bg-red-500",
        votes: 112,
      },
      {
        id: 3,
        name: "East Block",
        slogan: "Rising with the Sun",
        color: "bg-amber-500",
        votes: 138,
      },
    ],
  },
  {
    id: 5,
    title: "Student Activities Board",
    description: "Election for the student activities board members.",
    startTime: "2025-04-15T10:00:00",
    endTime: "2025-04-18T16:00:00",
    status: "completed",
    totalVotes: 421,
    eligibleVoters: 1200,
    lastUpdated: "2025-04-18T16:30:00",
    winner: "Events Team",
    candidates: [
      {
        id: 1,
        name: "Events Team",
        slogan: "Creating Memorable Experiences",
        color: "bg-purple-500",
        votes: 185,
      },
      {
        id: 2,
        name: "Budget Team",
        slogan: "Fiscal Responsibility",
        color: "bg-green-500",
        votes: 124,
      },
      {
        id: 3,
        name: "Outreach Team",
        slogan: "Connecting Communities",
        color: "bg-indigo-500",
        votes: 112,
      },
    ],
  },
  {
    id: 6,
    title: "Graduate Student Association",
    description: "Election for graduate student association leadership.",
    startTime: "2025-03-20T09:00:00",
    endTime: "2025-03-25T17:00:00",
    status: "completed",
    totalVotes: 289,
    eligibleVoters: 350,
    lastUpdated: "2025-03-25T17:30:00",
    winner: "Research Focus",
    candidates: [
      {
        id: 1,
        name: "Research Focus",
        slogan: "Advancing Knowledge",
        color: "bg-blue-500",
        votes: 142,
      },
      {
        id: 2,
        name: "Teaching Emphasis",
        slogan: "Sharing Knowledge",
        color: "bg-green-500",
        votes: 98,
      },
      {
        id: 3,
        name: "Balance Approach",
        slogan: "Best of Both Worlds",
        color: "bg-purple-500",
        votes: 49,
      },
    ],
  },
];

// Calculate percentage
function calculatePercentage(value, total) {
  if (total === 0) return 0;
  return Math.round((value / total) * 100);
}

// Get total votes for an election
function getTotalVotes(candidates) {
  return candidates.reduce((sum, candidate) => sum + candidate.votes, 0);
}

export default function ElectionResultsDashboard() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedElection, setSelectedElection] = useState(liveElections[0]);
  const [sortOrder, setSortOrder] = useState("desc");
  const [filterType, setFilterType] = useState("all");

  // Filter elections based on search query and filter type
  const filterElections = (elections) => {
    let filtered = elections;

    if (searchQuery) {
      filtered = filtered.filter((election) =>
        election.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (filterType === "high-turnout") {
      filtered = filtered.filter(
        (election) =>
          calculatePercentage(election.totalVotes, election.eligibleVoters) > 50
      );
    } else if (filterType === "low-turnout") {
      filtered = filtered.filter(
        (election) =>
          calculatePercentage(election.totalVotes, election.eligibleVoters) <=
          50
      );
    }

    return filtered;
  };

  // Sort elections
  const sortElections = (elections) => {
    return [...elections].sort((a, b) => {
      const dateA = new Date(a.endTime).getTime();
      const dateB = new Date(b.endTime).getTime();
      return sortOrder === "desc" ? dateB - dateA : dateA - dateB;
    });
  };

  const filteredLiveElections = filterElections(liveElections);
  const filteredPreviousElections = sortElections(
    filterElections(previousElections)
  );

  // Handle election selection
  const handleElectionSelect = (election) => {
    setSelectedElection(election);
  };

  useEffect(() => {
    const getLiveElections = async () => {
      const response = await axios("/api/elections/previous");
      console.log("response.data ::", response.data.elections);
    };

    getLiveElections();
  }, []);

  return (
    <div className="container mx-auto p-4 md:p-6 max-w-7xl">
      {/* Back button */}
      <Button
        variant="ghost"
        size="sm"
        className="mb-4 flex items-center gap-1 text-muted-foreground"
        onClick={() => router.push("/dashboard")}
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Dashboard
      </Button>

      <div className="mb-6">
        <h1 className="text-2xl font-bold md:text-3xl">Election Results</h1>
        <p className="mt-1 text-muted-foreground">
          View live and historical election results
        </p>
      </div>

      <Tabs defaultValue="live" className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
          <TabsList className="w-full sm:w-auto">
            <TabsTrigger value="live" className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>Live Results</span>
            </TabsTrigger>
            <TabsTrigger value="previous" className="flex items-center gap-2">
              <History className="h-4 w-4" />
              <span>Previous Elections</span>
            </TabsTrigger>
          </TabsList>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search elections..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Filter By</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setFilterType("all")}>
                  All Elections
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterType("high-turnout")}>
                  High Turnout &gt;50%
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterType("low-turnout")}>
                  Low Turnout ≤50%
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              variant="outline"
              size="icon"
              onClick={() =>
                setSortOrder(sortOrder === "desc" ? "asc" : "desc")
              }
              title={sortOrder === "desc" ? "Newest First" : "Oldest First"}
            >
              <ArrowUpDown className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Live Results Tab */}
        <TabsContent value="live">
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Elections List */}
            <div className="lg:col-span-1 space-y-4">
              <h2 className="text-lg font-semibold mb-2">Live Elections</h2>

              {filteredLiveElections.length > 0 ? (
                filteredLiveElections.map((election) => (
                  <Card
                    key={election.id}
                    className={`cursor-pointer hover:border-primary transition-colors ${
                      selectedElection?.id === election.id
                        ? "border-primary ring-1 ring-primary"
                        : ""
                    }`}
                    onClick={() => handleElectionSelect(election)}
                  >
                    <CardHeader className="p-4">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-base">
                          {election.title}
                        </CardTitle>
                        <Badge
                          variant="default"
                          className="bg-green-500 hover:bg-green-600"
                        >
                          Live
                        </Badge>
                      </div>
                      <CardDescription className="line-clamp-1">
                        {election.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-muted-foreground">Votes:</span>
                        <span className="font-medium">
                          {election.totalVotes} / {election.eligibleVoters}
                        </span>
                      </div>
                      <Progress
                        value={calculatePercentage(
                          election.totalVotes,
                          election.eligibleVoters
                        )}
                        className="h-2"
                      />
                      <div className="flex justify-between text-xs mt-1">
                        <span className="text-muted-foreground">
                          {calculatePercentage(
                            election.totalVotes,
                            election.eligibleVoters
                          )}
                          % Turnout
                        </span>
                        <span className="text-muted-foreground">
                          {moment().isAfter(moment(election.endTime))
                            ? `Ended ${moment(election.endTime).fromNow()}`
                            : `Ends in ${moment(election.endTime).toNow(true)}`}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="text-center p-8 bg-muted/30 rounded-lg">
                  <Clock className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                  <h3 className="text-lg font-medium">
                    No live elections found
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {searchQuery
                      ? "Try a different search term"
                      : "Check back later for live elections"}
                  </p>
                </div>
              )}
            </div>

            {/* Selected Election Details */}
            {selectedElection && (
              <div className="lg:col-span-2 space-y-6">
                {/* Election timing status */}
                {(() => {
                  const now = moment();
                  const end = moment(selectedElection.endTime);
                  if (!selectedElection.endTime) return null;
                  if (now.isAfter(end)) {
                    return (
                      <div className="mb-2 text-red-500 font-semibold">
                        Election Ended {end.fromNow()} (ended at{" "}
                        {end.format("LLL")})
                      </div>
                    );
                  } else {
                    return (
                      <div className="mb-2 text-green-600 font-semibold">
                        Time Remaining: {end.toNow(true)} (ends at{" "}
                        {end.format("LLL")})
                      </div>
                    );
                  }
                })()}
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl">
                          {selectedElection.title}
                        </CardTitle>
                        <CardDescription>
                          {selectedElection.description}
                        </CardDescription>
                      </div>
                      <div className="flex items-center gap-2">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="outline" size="icon">
                                <Download className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Download Results</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>

                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="outline" size="icon">
                                <Share2 className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Share Results</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Election Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="bg-muted/30 p-3 rounded-lg">
                        <div className="text-muted-foreground text-xs mb-1">
                          Total Votes
                        </div>
                        <div className="text-xl font-semibold">
                          {selectedElection.totalVotes}
                        </div>
                      </div>
                      <div className="bg-muted/30 p-3 rounded-lg">
                        <div className="text-muted-foreground text-xs mb-1">
                          Turnout
                        </div>
                        <div className="text-xl font-semibold">
                          {calculatePercentage(
                            selectedElection.totalVotes,
                            selectedElection.eligibleVoters
                          )}
                          %
                        </div>
                      </div>
                      <div className="bg-muted/30 p-3 rounded-lg">
                        <div className="text-muted-foreground text-xs mb-1">
                          Time Remaining
                        </div>
                        <div className="text-xl font-semibold">
                          {moment().isAfter(moment(selectedElection.endTime))
                            ? `Ended ${moment(
                                selectedElection.endTime
                              ).fromNow()}`
                            : `${moment(selectedElection.endTime).toNow(true)}`}
                        </div>
                      </div>
                      <div className="bg-muted/30 p-3 rounded-lg">
                        <div className="text-muted-foreground text-xs mb-1">
                          Last Updated
                        </div>
                        <div className="text-sm font-medium">
                          {selectedElection.lastUpdated
                            ? moment(selectedElection.lastUpdated).format("LT")
                            : "-"}
                          <div className="text-xs text-muted-foreground">
                            {selectedElection.lastUpdated
                              ? moment(selectedElection.lastUpdated).format(
                                  "LL"
                                )
                              : "-"}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Results Visualization */}
                    <div>
                      <h3 className="text-lg font-semibold mb-4">
                        Current Results
                      </h3>
                      <div className="space-y-6">
                        {selectedElection.candidates.map((candidate) => (
                          <div key={candidate.id} className="space-y-2">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <div
                                  className={`h-4 w-4 rounded-full ${candidate.color}`}
                                ></div>
                                <span className="font-medium">
                                  {candidate.name}
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-lg font-semibold">
                                  {calculatePercentage(
                                    candidate.votes,
                                    selectedElection.totalVotes
                                  )}
                                  %
                                </span>
                                <span className="text-sm text-muted-foreground">
                                  ({candidate.votes} votes)
                                </span>
                              </div>
                            </div>
                            <div className="relative pt-1">
                              <div className="flex mb-2 items-center justify-between">
                                <div>
                                  <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-white bg-muted/80">
                                    {candidate.slogan}
                                  </span>
                                </div>
                              </div>
                              <div className="overflow-hidden h-6 text-xs flex rounded-full bg-muted/30">
                                <div
                                  style={{
                                    width: `${calculatePercentage(
                                      candidate.votes,
                                      selectedElection.totalVotes
                                    )}%`,
                                  }}
                                  className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${candidate.color}`}
                                >
                                  {calculatePercentage(
                                    candidate.votes,
                                    selectedElection.totalVotes
                                  ) > 10 && (
                                    <span className="px-2 font-semibold">
                                      {calculatePercentage(
                                        candidate.votes,
                                        selectedElection.totalVotes
                                      )}
                                      %
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Voting Timeline */}
                    <div>
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-semibold">
                          Voting Timeline
                        </h3>
                        <Select defaultValue="today">
                          <SelectTrigger className="w-[140px]">
                            <SelectValue placeholder="Select period" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Time Period</SelectLabel>
                              <SelectItem value="today">Today</SelectItem>
                              <SelectItem value="yesterday">
                                Yesterday
                              </SelectItem>
                              <SelectItem value="week">This Week</SelectItem>
                              <SelectItem value="all">All Time</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="h-[200px] w-full">
                        <div className="flex h-full items-end gap-2">
                          {selectedElection.hourlyData.map((data, index) => (
                            <div
                              key={index}
                              className="flex flex-col items-center flex-1"
                            >
                              <div
                                className="w-full bg-primary/80 rounded-t"
                                style={{
                                  height: `${
                                    (data.votes /
                                      Math.max(
                                        ...selectedElection.hourlyData.map(
                                          (d) => d.votes
                                        )
                                      )) *
                                    150
                                  }px`,
                                }}
                              ></div>
                              <div className="text-xs mt-2 text-muted-foreground">
                                {data.hour}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Election Information */}
                    <div className="bg-muted/20 p-4 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Info className="h-4 w-4 text-muted-foreground" />
                        <h3 className="font-medium">Election Information</h3>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground mb-1">
                            Start Date:
                          </p>
                          <p className="font-medium">
                            {selectedElection.startTime
                              ? moment(selectedElection.startTime).format("LLL")
                              : "-"}
                          </p>
                        </div>
                        <div>
                          <p className="text-muted-foreground mb-1">
                            End Date:
                          </p>
                          <p className="font-medium">
                            {selectedElection.endTime
                              ? moment(selectedElection.endTime).format("LLL")
                              : "-"}
                          </p>
                        </div>
                        <div>
                          <p className="text-muted-foreground mb-1">
                            Eligible Voters:
                          </p>
                          <p className="font-medium">
                            {selectedElection.eligibleVoters.toLocaleString()}
                          </p>
                        </div>
                        <div>
                          <p className="text-muted-foreground mb-1">
                            Current Participation:
                          </p>
                          <p className="font-medium">
                            {selectedElection.totalVotes.toLocaleString()} votes
                            (
                            {calculatePercentage(
                              selectedElection.totalVotes,
                              selectedElection.eligibleVoters
                            )}
                            %)
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </TabsContent>

        {/* Previous Elections Tab */}
        <TabsContent value="previous">
          <div className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredPreviousElections.length > 0 ? (
                filteredPreviousElections.map((election) => (
                  <Card key={election.id} className="overflow-hidden">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg line-clamp-1">
                          {election.title}
                        </CardTitle>
                        <Badge
                          variant="outline"
                          className="bg-gray-100 text-gray-800 hover:bg-gray-200 border-gray-200"
                        >
                          Completed
                        </Badge>
                      </div>
                      <CardDescription className="line-clamp-2">
                        {election.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="mb-4">
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-muted-foreground">Winner:</span>
                          <span className="font-medium text-green-600 flex items-center">
                            {election.winner}{" "}
                            <CheckCircle className="ml-1 h-3.5 w-3.5" />
                          </span>
                        </div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-muted-foreground">
                            Total Votes:
                          </span>
                          <span>{election.totalVotes}</span>
                        </div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-muted-foreground">
                            Turnout:
                          </span>
                          <span>
                            {calculatePercentage(
                              election.totalVotes,
                              election.eligibleVoters
                            )}
                            %
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Date:</span>
                          <span>
                            {election.startTime
                              ? moment(election.startTime).format("LLL")
                              : "-"}{" "}
                            -{" "}
                            {election.endTime
                              ? moment(election.endTime).format("LLL")
                              : "-"}
                          </span>
                        </div>
                      </div>

                      <h4 className="text-sm font-medium mb-2">Results</h4>
                      <div className="space-y-2">
                        {election.candidates.map((candidate) => (
                          <div key={candidate.id} className="space-y-1">
                            <div className="flex items-center justify-between text-sm">
                              <div className="flex items-center gap-1.5">
                                <div
                                  className={`h-3 w-3 rounded-full ${candidate.color}`}
                                ></div>
                                <span
                                  className={
                                    candidate.name === election.winner
                                      ? "font-medium text-green-600"
                                      : ""
                                  }
                                >
                                  {candidate.name}
                                  {candidate.name === election.winner && (
                                    <CheckCircle className="ml-1 inline-block h-3 w-3" />
                                  )}
                                </span>
                              </div>
                              <div className="flex items-center gap-1">
                                <span>
                                  {calculatePercentage(
                                    candidate.votes,
                                    election.totalVotes
                                  )}
                                  %
                                </span>
                                <span className="text-xs text-muted-foreground">
                                  ({candidate.votes})
                                </span>
                              </div>
                            </div>
                            <Progress
                              value={calculatePercentage(
                                candidate.votes,
                                election.totalVotes
                              )}
                              className={`h-1.5 ${candidate.color}`}
                            />
                          </div>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter className="pt-2">
                      <Button variant="outline" size="sm" className="w-full">
                        View Detailed Results
                      </Button>
                    </CardFooter>
                  </Card>
                ))
              ) : (
                <div className="col-span-full text-center p-12 bg-muted/30 rounded-lg">
                  <History className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                  <h3 className="text-xl font-medium">
                    No previous elections found
                  </h3>
                  <p className="text-sm text-muted-foreground mt-2">
                    {searchQuery || filterType !== "all"
                      ? "Try different search terms or filters"
                      : "Completed elections will appear here"}
                  </p>
                  {(searchQuery || filterType !== "all") && (
                    <Button
                      variant="outline"
                      className="mt-4"
                      onClick={() => {
                        setSearchQuery("");
                        setFilterType("all");
                      }}
                    >
                      Clear Filters
                    </Button>
                  )}
                </div>
              )}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
