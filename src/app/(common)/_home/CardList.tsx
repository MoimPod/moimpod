"use client";

import CreateGatheringsModal from "@/app/(common)/_home/_components/CreateGatheringsModal";
import GatheringFilters from "@/app/(common)/_home/_components/GatheringFilters";
import Button from "@/components/Button";
import Card from "@/components/Card";
import { LoginPopup } from "@/components/Popup";
import ServiceTab from "@/components/ServiceTab";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { useFilters } from "@/app/(common)/_home/_hooks/useFilters";
import { useGatherings } from "@/app/(common)/_home/_hooks/useGathering";
import { useAuth } from "@/app/(common)/_home/_hooks/useAuth";
import GatheringLogo from "@/images/gathering_logo.svg";
import { useState, useEffect } from "react";

export default function CardList() {
  const { filters, handleFilterChange } = useFilters(); // 필터 관리 적용
  const { filteredCards, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, dataFetched } =
    useGatherings(filters);
  const { checkAuth, isAuthModalOpen, setAuthModalOpen, shouldOpenCreateModal, setShouldOpenCreateModal } = useAuth(); // 로그인 체크 적용
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (shouldOpenCreateModal) {
      setIsModalOpen(true);
      setShouldOpenCreateModal(false); // 로그인 후 다시 열리지 않도록 초기화
    }
  }, [shouldOpenCreateModal, setShouldOpenCreateModal]);

  const handleOpen = () => {
    checkAuth(() => {
      setIsModalOpen(true);
      setShouldOpenCreateModal(false);
    });
  };
  const handleClose = () => setIsModalOpen(false);

  // 무한 스크롤 훅 사용
  const { observerRef } = useInfiniteScroll({ fetchNextPage, hasNextPage, isFetchingNextPage });

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
        <div className="flex flex-row">
          <ServiceTab
            searchParams={new URLSearchParams(filters.toString())}
            onCategoryChange={(type) => {
              handleFilterChange({ type });
            }}
          />

          <LoginPopup
            isOpen={isAuthModalOpen}
            onClose={() => {
              setAuthModalOpen(false);
            }}
          />
        </div>
        <Button
          type="button"
          styleType="solid"
          size="sm"
          className="absolute right-0 top-0 h-10 w-24 md:h-11"
          onClick={handleOpen}
        >
          모임 만들기
        </Button>
      </div>
      <hr className="my-3" />
      <div>
        <GatheringFilters onChange={handleFilterChange} />

        {isLoading ? (
          <div className="flex h-[calc(100vh-50vh)] flex-col items-center justify-center text-center text-sm font-medium text-gray-500">
            <p>모임 정보를 불러오는 중...</p>
          </div>
        ) : filteredCards.length === 0 ? (
          <div className="flex h-[calc(100vh-50vh)] flex-col items-center justify-center text-center text-sm font-medium text-gray-500">
            <p>아직 모임이 없어요</p>
            <p className="mt-2">지금 바로 모임을 만들어보세요</p>
          </div>
        ) : (
          filteredCards.map((card) => <Card key={card.id} {...card} registrationEnd={card.registrationEnd ?? ""} />)
        )}
        {!isLoading && <div ref={observerRef} className="h-10"></div>}
        {!isLoading && isFetchingNextPage && <div className="text-center text-sm text-gray-500">불러오는 중...</div>}
      </div>

      <CreateGatheringsModal isOpen={isModalOpen} onClose={handleClose} />
    </div>
  );
}
