"use client";

import CreateGatheringsModal from "@/app/(common)/_home/_components/CreateGatheringsModal";
import GatheringFilters from "@/app/(common)/_home/_components/GatheringFilters";
import ServiceTab from "@/app/(common)/_home/_components/ServiceTab";
import { useCheckAuth } from "@/app/(common)/_home/_hooks/useCheckAuth";
import { useFetchGatherings } from "@/app/(common)/_home/_hooks/useFetchGatherings";
import Button from "@/components/Button";
import Card from "@/components/Card";
import { LoginPopup } from "@/components/Popup";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import GatheringLogo from "@/images/gathering_logo.svg";
import { useUserStore } from "@/stores/useUserStore";
import { useEffect, useState } from "react";

export default function CardList() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filters, setFilters] = useState<{ location?: string; dateTime?: string; sortBy?: string }>({});

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useFetchGatherings(filters);

  // 로그인 체크 훅
  const { checkAuth, isAuthModalOpen, setAuthModalOpen } = useCheckAuth();

  const shouldOpenCreateModal = useUserStore((state) => state.shouldOpenCreateModal);
  const setShouldOpenCreateModal = useUserStore((state) => state.setShouldOpenCreateModal);

  useEffect(() => {
    if (shouldOpenCreateModal) {
      setIsModalOpen(true);
      setShouldOpenCreateModal(false); // 상태 초기화
    }
  }, [shouldOpenCreateModal]);

  const handleOpen = () => {
    checkAuth(() => setIsModalOpen(true)); // 로그인 여부 확인 후 실행
  };
  const handleClose = () => setIsModalOpen(false);

  // 무한 스크롤 훅 사용
  const { observerRef } = useInfiniteScroll({ fetchNextPage, hasNextPage, isFetchingNextPage });

  // 마감되지 않은 모임만 필터링
  const filteredCards = data?.pages.flatMap((page) =>
    page.data.filter((card) => !card.registrationEnd || new Date(card.registrationEnd) >= new Date()),
  );

  return (
    <div>
      <div className="mb-5 flex flex-row items-center gap-4 pl-3 pt-10">
        <GatheringLogo />
        <div>
          <div className="mb-2 text-sm font-semibold text-gray-700">함께할 사람이 없나요?</div>
          <div className="text-lg font-semibold text-gray-900 lg:text-2xl">지금 모임에 참여해보세요</div>
        </div>
      </div>
      <div className="relative mt-6">
        <div className="flex flex-col">
          <ServiceTab />
          <div className="w-[114px]">
            <LoginPopup
              isOpen={isAuthModalOpen}
              onClose={() => {
                setAuthModalOpen(false);
              }}
            />
          </div>
        </div>
        <Button styleType="solid" size="sm" className="absolute right-0 top-0 h-10 w-24 md:h-11" onClick={handleOpen}>
          모임 만들기
        </Button>
      </div>
      <hr className="my-3" />
      <div className="">
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
            ))}
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
