import { MyGathering, Reviews } from "@/app/(common)/mypage/types";
import axiosInstance from "@/lib/axiosInstance";
import { CardData } from "@/stores/useGatheringStore";

interface FetchMyGatheringsParams {
  completed?: boolean;
  reviewed?: boolean;
}

const fetchMyGatherings = async (query?: FetchMyGatheringsParams) => {
  const response = await axiosInstance.get<MyGathering[]>("gatherings/joined", {
    params: {
      limit: 100,
      ...query,
    },
  });
  return response.data;
};

const fetchMyReviews = async (userId: number) => {
  const response = await axiosInstance.get<Reviews>("reviews", {
    params: {
      limit: 100,
      userId,
    },
  });

  return response.data.data;
};

const fetchMyCreatedGatherings = async (createdBy: number) => {
  const response = await axiosInstance.get<CardData[]>("gatherings", {
    params: {
      limit: 100,
      createdBy,
    },
  });

  return response.data;
};

export { fetchMyGatherings, fetchMyReviews, fetchMyCreatedGatherings };
