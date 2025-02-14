import apiClient from "@/services/appClient";
import type { ReviewQuery, ReviewsResponse } from "../types";

export const fetchReviews = async (query?: ReviewQuery): Promise<ReviewsResponse> => {
  try {
    const { data } = await apiClient.get("/reviews", { params: query });
    return data;
  } catch (error) {
    throw new Error("데이터를 불러오지 못했습니다.");
  }
};
