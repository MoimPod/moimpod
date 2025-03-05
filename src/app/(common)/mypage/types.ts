import { GatheringType, UserType } from "@/types";

export type MyGathering = GatheringType & {
  joinedAt: string;
  isCompleted: boolean;
  isReviewed: boolean;
};

export type DataItem = {
  teamId: number;
  id: number;
  score: number;
  comment: string;
  createdAt: string;
  Gathering: Pick<GatheringType, "teamId" | "id" | "type" | "name" | "dateTime" | "location" | "image">;
  User: Pick<UserType, "id" | "name" | "image">;
};

export type Reviews = {
  data: DataItem[];
  totalItemCount: number;
  currentPage: number;
  totalPages: number;
};
