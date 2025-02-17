import apiClient from "@/services/appClient";
import type { ScoresQuery, ScoresResponse } from "../types";

export const fetchReviewsScores = async (query?: ScoresQuery): Promise<ScoresResponse[]> => {
  try {
    const { data } = await apiClient.get("/reviews/scores", { params: query });
    return data;
  } catch (error) {
    throw new Error("데이터를 불러오지 못했습니다.");
  }
};
