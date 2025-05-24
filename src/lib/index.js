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

export function getTimeEnded(time) {
  if (time) {
    const endTime = new Date(time)?.getTime();
    const now = Date.now();
    return endTime <= now ? true : false;
  }
}

export function getTotalCastVotes(election) {
  return election.candidates?.reduce(
    (acc, candidate) => acc + (candidate.votes || 0),
    0
  );
}
