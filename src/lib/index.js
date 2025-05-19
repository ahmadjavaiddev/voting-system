import { jwtVerify } from "jose";

export function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

// Calculate time remaining
export function getTimeRemaining(dateString) {
  const targetDate = new Date(dateString).getTime();
  const now = new Date().getTime();
  const difference = targetDate - now;

  if (difference <= 0) return "Started";

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );

  if (days > 0) {
    return `${days} day${days > 1 ? "s" : ""} ${hours} hr${
      hours > 1 ? "s" : ""
    }`;
  } else {
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours} hr${hours > 1 ? "s" : ""} ${minutes} min${
      minutes > 1 ? "s" : ""
    }`;
  }
}

// Calculate time left in election
export function getTimeLeft(endDateString) {
  const endDate = new Date(endDateString).getTime();
  const now = new Date().getTime();
  const difference = endDate - now;

  if (difference <= 0) return "Ended";

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );

  if (days > 0) {
    return `${days} day${days > 1 ? "s" : ""} ${hours} hr${
      hours > 1 ? "s" : ""
    }`;
  } else {
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours} hr${hours > 1 ? "s" : ""} ${minutes} min${
      minutes > 1 ? "s" : ""
    }`;
  }
}

export function calculatePercentage(value, total) {
  if (total === 0) return 0;
  return Math.round((value / total) * 100);
}

export const mockElections = {
  live: [
    {
      id: 1,
      title: "Student Council Election 2025",
      startTime: "2025-05-10T09:00:00",
      endTime: "2025-05-15T18:00:00",
      parties: ["Party A", "Party B", "Party C"],
      votes: 256,
    },
    {
      id: 2,
      title: "Community Board Election",
      startTime: "2025-05-12T10:00:00",
      endTime: "2025-05-16T20:00:00",
      parties: ["Group 1", "Group 2", "Independent"],
      votes: 124,
    },
  ],
  upcoming: [
    {
      id: 3,
      title: "Department Head Selection",
      startTime: "2025-05-20T08:00:00",
      endTime: "2025-05-22T17:00:00",
      parties: ["Candidate X", "Candidate Y", "Candidate Z"],
    },
    {
      id: 4,
      title: "Club President Election",
      startTime: "2025-05-25T09:00:00",
      endTime: "2025-05-26T18:00:00",
      parties: ["Team Red", "Team Blue"],
    },
    {
      id: 5,
      title: "Budget Committee Election",
      startTime: "2025-06-01T10:00:00",
      endTime: "2025-06-03T16:00:00",
      parties: ["Reform Group", "Status Quo", "Progressive Team"],
    },
  ],
  previous: [
    {
      id: 6,
      title: "Faculty Senate Election",
      startTime: "2025-04-01T08:00:00",
      endTime: "2025-04-05T17:00:00",
      parties: ["Liberal Arts", "Sciences", "Engineering"],
      winner: "Sciences",
      votes: 532,
    },
    {
      id: 7,
      title: "Dormitory Representative",
      startTime: "2025-04-10T09:00:00",
      endTime: "2025-04-12T18:00:00",
      parties: ["North Block", "South Block", "East Block"],
      winner: "East Block",
      votes: 348,
    },
    {
      id: 8,
      title: "Student Activities Board",
      startTime: "2025-04-15T10:00:00",
      endTime: "2025-04-18T16:00:00",
      parties: ["Events Team", "Budget Team", "Outreach Team"],
      winner: "Events Team",
      votes: 421,
    },
  ],
};

export const electionData = {
  id: 1,
  title: "Student Council Election 2025",
  description:
    "Annual election for the Student Council representatives who will serve for the 2025-2026 academic year. The elected council will be responsible for organizing student events, representing student interests to the administration, and managing the student activity budget.",
  startTime: "2025-05-10T09:00:00",
  endTime: "2025-05-15T18:00:00",
  status: "live", // live, upcoming, ended
  totalVotes: 256,
  eligibleVoters: 1200,
  rules: [
    "Each student may cast one vote only",
    "Voting requires valid student ID verification",
    "Results will be announced within 24 hours of election close",
    "Any disputes must be filed within 48 hours of results announcement",
  ],
  candidates: [
    {
      id: 1,
      name: "Progress Party",
      slogan: "Building a Better Tomorrow",
      platform: [
        "Increase student activity funding by 15%",
        "Create more study spaces across campus",
        "Implement monthly town halls with administration",
        "Expand mental health resources",
      ],
      members: [
        "Alex Johnson (President)",
        "Maria Garcia (Vice President)",
        "David Kim (Treasurer)",
      ],
      votes: 98,
      color: "bg-blue-500",
    },
    {
      id: 2,
      name: "Student Voice",
      slogan: "Your Campus, Your Voice",
      platform: [
        "Reduce student fees by 10%",
        "Extend library hours during exam periods",
        "Create a student-run food cooperative",
        "Improve campus sustainability initiatives",
      ],
      members: [
        "Taylor Smith (President)",
        "James Wilson (Vice President)",
        "Sophia Chen (Treasurer)",
      ],
      votes: 87,
      color: "bg-green-500",
    },
    {
      id: 3,
      name: "Unity Coalition",
      slogan: "Together We Achieve More",
      platform: [
        "Create a diverse student advisory board",
        "Improve accessibility across campus",
        "Establish more international student programs",
        "Enhance career services and internship opportunities",
      ],
      members: [
        "Jordan Lee (President)",
        "Olivia Martinez (Vice President)",
        "Noah Williams (Treasurer)",
      ],
      votes: 71,
      color: "bg-purple-500",
    },
  ],
  userHasVoted: false,
};

export const JWT_SECRET = process.env.JWT_SECRET || "secret";

export async function verifyJWT(token) {
  const secret = new TextEncoder().encode(JWT_SECRET);
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload;
  } catch {
    return null;
  }
}

export function getToken(req) {
  const auth = req.headers.get("cookie");
  if (!auth) return null;
  return auth.replace("token=", "");
}

export async function validateJWTToken(request) {
  const token = getToken(request);
  const secret = new TextEncoder().encode(JWT_SECRET);
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload;
  } catch {
    return null;
  }
}

export function getTimeEnded(time) {
  if (time) {
    const endTime = new Date(time)?.getTime();
    const now = Date.now();
    return endTime <= now ? true : false;
  }
}
