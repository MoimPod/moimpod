export const SORT_OPTION = [
  { label: "최신순", value: "latest" },
  { label: "별점 높은순", value: "highScore" },
  { label: "참여 인원순", value: "highParticipants" },
];

export const SORT_MAP: Record<string, { sortBy: string; sortOrder: string }> = {
  latest: { sortBy: "createdAt", sortOrder: "desc" },
  highScore: { sortBy: "score", sortOrder: "desc" },
  highParticipants: { sortBy: "participantCount", sortOrder: "desc" },
};
