import axiosInstance from "@/lib/axiosInstance";
import { useQuery } from "@tanstack/react-query";

const fetchMyGatherings = async () => {
  try {
    const { data } = await axiosInstance.get("gatherings/joined");
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

export const useGetUserInfo = () => {
  return useQuery<MyGathering[]>({
    queryKey: ["my-gatherings"],
    queryFn: () => fetchMyGatherings(),
  });
};

export default function MyGatherings() {
  const { data, isLoading, error } = useGetUserInfo();

  if (isLoading) return <p>Loading 나의 모임...</p>;
  if (error) return <p>Error loading 나의 모임.</p>;

  return (
    <>
      {data?.length ? (
        data?.map((meeting) => (
          <div key={meeting.id} className="flex-1">
            <li>{meeting.name}</li>
          </div>
        ))
      ) : (
        <div className="flex flex-1 items-center justify-center">
          <p>신청한 모임이 아직 없어요</p>
        </div>
      )}
    </>
  );
}
