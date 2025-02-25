import { useGetMyCreatedGatherings } from "@/app/(common)/mypage/_hooks/useGetCreatedGathering";
import { useGetUserInfo } from "@/app/(common)/mypage/_hooks/useGetUserInfo";
import ListItem from "@/components/ListItem";
import Spinner from "@/components/Spinner";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import Image from "next/image";

export default function MyCreatedGatherings() {
  const { data: userData } = useGetUserInfo();
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, error } = useGetMyCreatedGatherings(
    userData?.id ?? 0,
  );
  const allGatherings = data?.pages.flatMap((page) => page.data) || [];
  const { observerRef } = useInfiniteScroll({
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  });

  if (isLoading)
    return (
      <div className="flex flex-1 items-center justify-center">
        <Spinner />
      </div>
    );
  if (error)
    return (
      <div className="flex flex-1 items-center justify-center">
        <p>목록 조회 중 에러가 발생했습니다.</p>
      </div>
    );
  return (
    <>
      {allGatherings.length ? (
        <>
          {allGatherings.map((gathering) => (
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
                className="justify-between"
              >
                <div className="flex flex-col gap-2.5">
                  <div className="flex flex-col gap-1">
                    <ListItem.Title title={gathering.name} subtitle={gathering.location} />
                    <ListItem.SubInfo
                      date={gathering.dateTime}
                      participantCount={gathering.participantCount}
                      capacity={gathering.capacity}
                    />
                  </div>
                </div>
              </ListItem>
            </div>
          ))}
          <div ref={observerRef} className="h-10" />
          {isFetchingNextPage && <div className="text-center text-sm text-gray-500">더 불러오는 중...</div>}
        </>
      ) : (
        <div className="flex flex-1 items-center justify-center">
          <p>아직 만든 모임이 없어요</p>
        </div>
      )}
    </>
  );
}
