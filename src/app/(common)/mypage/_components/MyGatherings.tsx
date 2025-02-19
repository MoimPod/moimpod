import ListItem from "@/components/ListItem";
import Image from "next/image";
import Button from "@/components/Button";
import useDeleteJoinedGathering from "@/app/(common)/mypage/_hooks/useDeleteJoinedGathering";
import { useGetJoinedGatherings } from "@/app/(common)/mypage/_hooks/useGetJoinedGatherings";

export default function MyGatherings() {
  const { data, isLoading, error } = useGetJoinedGatherings();
  const mutation = useDeleteJoinedGathering();
  if (isLoading) return <p>Loading 나의 모임...</p>;
  if (error) return <p>Error loading 나의 모임.</p>;
  return (
    <>
      {data?.length ? (
        <div className="flex-1 divide-y-2 divide-dashed">
          {data?.map((gathering) => (
            <div className="relative py-6" key={gathering.id}>
              <ListItem
                CardImage={
                  <Image
                    src={gathering.image}
                    alt="모임 이미지"
                    width={280}
                    height={156}
                    className="h-[156px] w-full rounded-3xl md:max-w-[280px]"
                  />
                }
                canceledAt={gathering.canceledAt}
                handleCancel={() => mutation.mutate(gathering.id)}
                className="justify-between"
              >
                <div className="flex flex-col gap-2.5">
                  <ListItem.Status isCompleted={gathering.isCompleted} participantCount={gathering.participantCount} />
                  <div className="flex flex-col gap-1">
                    <ListItem.Title title={gathering.name} subtitle={gathering.location} />
                    <ListItem.SubInfo
                      date={gathering.dateTime}
                      participantCount={gathering.participantCount}
                      capacity={gathering.capacity}
                    />
                  </div>
                </div>
                <Button
                  onClick={() => mutation.mutate(gathering.id)}
                  className="mt-[18px] w-full max-w-[120px]"
                  size="sm"
                  styleType="outline"
                >
                  {/*모임이 끝났으면 리뷰 작성 / 아니면 예약 취소 */}
                  {gathering.isCompleted ? "리뷰 작성하기" : "예약 취소하기"}
                </Button>
              </ListItem>
            </div>
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
