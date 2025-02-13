export type User = {
  id: number;
  email: string;
  name: string;
  companyName: string;
  image: string | null;
};

export type GatheringParticipant = {
  teamId: string;
  userId: number;
  gatheringId: number;
  joinedAt: string;
  User: User;
};
