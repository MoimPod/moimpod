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
  useId?: number;
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
  count: number;
  capacity: number;
  createdBy: number;
  canceledAt: string;
};

export type Review = {
  teamId?: string;
  id: number;
  score: number;
  comment: string;
  createdAt: string;
  Gathering?: GatheringType;
  User: User;
};

// 실제 데이터 응답값
export type ReviewsResponse = {
  data: Review[];
  totalItemCount: number;
  currentPage: number;
  totalPages: number;
};

// 리뷰 정제 데이터
export type ReviewData = {
  reviews: Review[];
  totalItemCount: number;
  currentPage: number;
  totalPages: number;
};
