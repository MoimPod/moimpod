"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import CreateGatheringsModal from "@/app/_home/_components/CreateGatheringsModal";
import ServiceTab from "@/app/_home/_components/SeviceTab";
import GatheringFilters from "@/app/_home/_components/GatheringFilters";
import Card from "@/components/Card";
import Button from "@/components/Button";
import GatheringLogo from "@/images/gathering_logo.svg";
import { useFetchGatherings } from "@/app/_home/_hooks/useFetchGatherings";

export default function CardList() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filters, setFilters] = useState<{ city?: string; district?: string; dateTime?: string; sortBy?: string }>({});

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useFetchGatherings(filters);

  const handleOpen = () => setIsModalOpen(true);
  const handleClose = () => setIsModalOpen(false);

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

  // 마감되지 않은 모임만 필터링
  const filteredCards = data?.pages.flatMap((page) =>
    page.data.filter((card) => !card.registrationEnd || new Date(card.registrationEnd) >= new Date()),
  );

  return (
    <div>
      <div className="mb-5 flex gap-6 pt-8">
        <GatheringLogo />
        <div>
          <div className="mb-2 text-sm font-semibold text-gray-700">함께할 사람이 없나요?</div>
          <div className="text-2xl font-semibold text-gray-900">지금 모임에 참여해보세요</div>
        </div>
      </div>
      <div className="px-6 pt-6">
        <div className="flex items-center">
          <ServiceTab />
          <div className="ml-auto w-[114px]">
            <Button styleType="solid" size="sm" className="h-10 md:h-11" onClick={handleOpen}>
              모임 만들기
            </Button>
          </div>
        </div>
      </div>
      <hr className="my-3" />
      <div className="px-6">
        <GatheringFilters onChange={setFilters} />

        {data?.pages[0].data.length === 0 || filteredCards?.length === 0 ? (
          <div className="flex h-[calc(100vh-50vh)] flex-col items-center justify-center text-center text-sm font-medium text-gray-500">
            <p>아직 모임이 없어요</p>
            <p className="mt-2">지금 바로 모임을 만들어보세요</p>
          </div>
        ) : (
          <>
            {filteredCards?.map((card) => (
              <Card key={card.id} {...card} registrationEnd={card.registrationEnd ?? ""} />
            ))}{" "}
            {/* 무한 스크롤 감지용 div */}
            <div ref={observerRef} className="h-10"></div>
          </>
        )}
        {isFetchingNextPage && <div className="text-center text-sm text-gray-500">더 불러오는 중...</div>}
      </div>

      <CreateGatheringsModal isOpen={isModalOpen} onClose={handleClose} />
    </div>
  );
}
