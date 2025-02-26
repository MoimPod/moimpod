"use client";

import Spinner from "@/components/Spinner";
import Image from "next/image";
import ListItem from "@/components/ListItem";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { useLeaveGathering } from "@/hooks/useLeaveGathering";
import { useState } from "react";
import Button from "@/components/Button";
import ReviewModal from "@/app/(common)/mypage/_components/ReviewModal";
import { useGetMyGatherings } from "@/app/(common)/mypage/_hooks/useGetMyGatherings";

export default function ReviewableGatherings() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, error } = useGetMyGatherings(
    ["user", "reviews", "reviewable"],
    { completed: true, reviewed: false },
  );
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedGathering, setSelectedGathering] = useState<number | null>(null);
  const handleOpen = (gatheringId: number) => {
    setSelectedGathering(gatheringId);
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
  };

  const mutation = useLeaveGathering(["my-gatherings"]);

  // 무한 스크롤을 감지할 ref
  const { observerRef } = useInfiniteScroll({
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  });
  // 페이지 내부 내용 중 canceledAt이 null인 모임만
  const allGatherings = (data?.pages.flatMap((page) => page.data) || []).filter((gathering) => !gathering.canceledAt);

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
                canceledAt={gathering.canceledAt}
                handleCancel={() => mutation.mutate(gathering.id)}
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
                <Button
                  onClick={() => handleOpen(gathering.id)}
                  className={"mt-[18px] w-full max-w-[120px]"}
                  size={"sm"}
                  styleType={"solid"}
                >
                  리뷰 작성하기
                </Button>
              </ListItem>
            </div>
          ))}
          <div ref={observerRef} className="h-10" />
          {isFetchingNextPage && <div className="text-center text-sm text-gray-500">더 불러오는 중...</div>}
          <ReviewModal isOpen={isModalOpen} onClose={handleClose} gatheringId={selectedGathering as number} />
        </>
      ) : (
        <div className="flex flex-1 items-center justify-center">
          <p>아직 작성 가능한 리뷰가 없어요</p>
        </div>
      )}
    </>
  );
}
