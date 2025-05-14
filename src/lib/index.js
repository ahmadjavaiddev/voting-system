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
