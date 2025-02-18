import axiosInstance from "@/lib/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import ListItem from "@/components/ListItem";
import Image from "next/image";
import Button from "@/components/Button";

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
        <div className="flex-1 divide-y-2 divide-dashed">
          {data?.map((gathering) => (
            <ListItem
              key={gathering.id}
              CardImage={
                <Image
                  src={gathering.image}
                  alt="모임 이미지"
                  width={280}
                  height={156}
                  className="h-[156px] w-full rounded-3xl md:max-w-[280px]"
                />
              }
              className="justify-between"
            >
              <div className="flex flex-col gap-2.5">
                <ListItem.Status isCompleted={!!gathering.canceledAt} participantCount={gathering.participantCount} />
                <div className="flex flex-col gap-1">
                  <ListItem.Title title={gathering.name} subtitle={gathering.location} />
                  <ListItem.SubInfo
                    date={gathering.dateTime}
                    participantCount={gathering.participantCount}
                    capacity={gathering.capacity}
                  />
                </div>
              </div>
              <Button className="mt-[18px] w-full max-w-[120px]" size="sm" styleType="outline">
                예약 취소하기
              </Button>
            </ListItem>
          ))}
        </div>
      ) : (
        <div className="flex flex-1 items-center justify-center">
          <p>신청한 모임이 아직 없어요</p>
        </div>
      )}
    </>
  );
}
