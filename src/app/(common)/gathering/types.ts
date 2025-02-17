export type User = {
  id: number;
  name: string;
  email?: string;
  companyName?: string;
  image: string | null;
};

export type GatheringParticipantType = {
  User: User;
  teamId: string;
  userId: number;
  gatheringId: number;
  joinedAt: string;
};

export type ReviewQuery = {
  gatheringId?: string;
  userId?: number;
  type?: string;
  location?: string;
  date?: string;
  registrationEnd?: string;
  sortBy?: "createdAt" | "score" | "participantCount";
  sortOrder?: "asc" | "desc";
  limit?: number;
  offset?: number;
};

export type GatheringType = {
  teamId: string;
  id: number;
  type: string;
  name: string;
  dateTime: string;
  registrationEnd: string;
  location: string;
  participantCount: number;
  image: string;
  capacity: number;
  createdBy: number;
  canceledAt: string;
};

export type ReviewResponse = {
  teamId?: string;
  id: number;
  score: number;
  comment: string;
  createdAt: string;
  Gathering?: GatheringType;
  User: User;
};

export type Review = Omit<ReviewResponse, "User"> & { user: User };

export type ReviewsResponse = {
  data: ReviewResponse[];
  totalItemCount: number;
  currentPage: number;
  totalPages: number;
};
