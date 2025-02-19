import axiosInstance from "@/lib/axiosInstance";
import { useQuery } from "@tanstack/react-query";

const fetchMyGatherings = async () => {
  try {
    const { data } = await axiosInstance.get("gatherings/joined", {
      params: {
        sortBy: "dateTime",
        sortOrder: "desc",
      },
    });
    return data;
  } catch (error) {
    throw new Error("데이터를 불러오지 못했습니다.");
  }
};

type MyGathering = {
  teamId: number;
  id: number;
  type: "DALLAEMFIT" | "OFFICE_STRETCHING" | "MINDFULNESS" | "WORKATION";
  name: string;
  dateTime: string;
  registrationEnd: string;
  location: string;
  participantCount: number;
  capacity: number;
  image: string;
  createdBy: number;
  canceledAt: string;
  joinedAt: string;
  isCompleted: boolean;
  isReviewed: boolean;
};

export const useGetJoinedGatherings = () => {
  return useQuery<MyGathering[]>({
    queryKey: ["my-gatherings"],
    queryFn: () => fetchMyGatherings(),
  });
};
