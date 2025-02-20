import ListItem from "@/components/ListItem";
import Image from "next/image";
import Button from "@/components/Button";
import useDeleteJoinedGathering from "@/app/(common)/mypage/_hooks/useDeleteJoinedGathering";
import { useGetJoinedGatherings } from "@/app/(common)/mypage/_hooks/useGetJoinedGatherings";
import { useCallback, useEffect, useRef, useState } from "react";
import ReviewModal from "@/app/(common)/mypage/_components/ReviewModal";

// 이용 예정 => 모임 참여 신청했고 isCompleted가 false인 경우
// 이용 완료 => 모임 참여 신청했고 isCompleted가 true인 경우
// 개설 대기 => participantCount가 5 미만인 경우
// 개설 확정 => participantCount가 5 이상인 경우

// 이용 예정 & 개설 대기 => 예약 취소 가능
// 이용 예정 & 개설 확정 => 예약 취소 가능
// 이용 완료 & isReviewed = true => 리뷰 작성하기
// 이용 완료 & isReviewed = false => ???

// 참여 시간이 지나지 않았고 아직 모집 중인 모임에 대해 예약을 취소할 수 있습니다.
// registrationEnd가 끝나지 않았고,
// 아직 모집 중인 모임??? => 취소되지 않은 모임.

// 리뷰
// isCompleted가 true, isReviewed가 false => 리뷰 작성하기
// isCompleted가 true, isReviewed가 true => 리뷰 작성 x
export default function MyGatherings() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, error } = useGetJoinedGatherings();
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedGathering, setSelectedGathering] = useState<number | null>(null);
  const handleOpen = (gatheringId: number) => {
    setSelectedGathering(gatheringId);
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
  };

  const mutation = useDeleteJoinedGathering();

  // 무한 스크롤을 감지할 ref
  const observerRef = useRef<HTMLDivElement | null>(null);

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      if (target.isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage(); // 다음 데이터 요청
      }
    },
    [fetchNextPage, hasNextPage, isFetchingNextPage],
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, { threshold: 1.0 });

    if (observerRef.current) observer.observe(observerRef.current);

    return () => {
      if (observerRef.current) observer.unobserve(observerRef.current);
    };
  }, [handleObserver]);

  const allGatherings = data?.pages.flatMap((page) => page.data) || [];

  if (isLoading) return <p>Loading 나의 모임...</p>;
  if (error) return <p>Error loading 나의 모임.</p>;
  return (
    <>
      {allGatherings.length ? (
        <>
          <div className="w-full">
            <div className="flex-1 divide-y-2 divide-dashed">
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
                      <ListItem.Status
                        isCompleted={gathering.isCompleted}
                        participantCount={gathering.participantCount}
                      />
                      <div className="flex flex-col gap-1">
                        <ListItem.Title title={gathering.name} subtitle={gathering.location} />
                        <ListItem.SubInfo
                          date={gathering.dateTime}
                          participantCount={gathering.participantCount}
                          capacity={gathering.capacity}
                        />
                      </div>
                    </div>
                    {gathering.isReviewed ? (
                      <Button className={"mt-[18px] w-full max-w-[120px]"} size={"sm"} styleType={"solid"} disabled>
                        리뷰 작성 완료
                      </Button>
                    ) : (
                      <Button
                        onClick={
                          gathering.isCompleted ? () => handleOpen(gathering.id) : () => mutation.mutate(gathering.id)
                        }
                        className={"mt-[18px] w-full max-w-[120px]"}
                        size={"sm"}
                        styleType={gathering.isCompleted ? "solid" : "outline"}
                        disabled={!!gathering.canceledAt}
                      >
                        {/*모임이 끝났으면 리뷰 작성 / 아니면 예약 취소 */}
                        {gathering.isCompleted ? "리뷰 작성하기" : "예약 취소하기"}
                      </Button>
                    )}
                  </ListItem>
                </div>
              ))}
            </div>
            <div ref={observerRef} className="h-10" />
            {isFetchingNextPage && <div className="text-center text-sm text-gray-500">더 불러오는 중...</div>}
          </div>
          <ReviewModal isOpen={isModalOpen} onClose={handleClose} gatheringId={selectedGathering as number} />
        </>
      ) : (
        <div className="flex flex-1 items-center justify-center">
          <p>신청한 모임이 아직 없어요</p>
        </div>
      )}
    </>
  );
}
