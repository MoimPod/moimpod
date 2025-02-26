"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import CreateGatheringsModal from "@/app/(common)/_home/_components/CreateGatheringsModal";
import ServiceTab from "@/components/ServiceTab";
import GatheringFilters from "@/app/(common)/_home/_components/GatheringFilters";
import Card from "@/components/Card";
import Button from "@/components/Button";
import GatheringLogo from "@/images/gathering_logo.svg";
import { useFetchGatherings } from "@/app/(common)/_home/_hooks/useFetchGatherings";
import { useCheckAuth } from "@/app/(common)/_home/_hooks/useCheckAuth";
import { LoginPopup } from "@/components/Popup";
import { useUserStore } from "@/stores/useUserStore";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";

export default function CardList() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const searchParamsString = searchParams.toString();

  const filters = useMemo(
    () => ({
      location: searchParams.get("location") || undefined,
      date: searchParams.get("date") || undefined,
      sortBy: searchParams.get("sortBy") || undefined,
      type: searchParams.get("type") || undefined,
    }),
    [searchParamsString],
  );

  const [isModalOpen, setIsModalOpen] = useState(false);

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

  // 필터를 업데이트 : searchParamsString을 사용하여 불필요한 재생성 방지
  const handleFilterChange = useCallback(
    (newFilter: Partial<typeof filters>) => {
      const params = new URLSearchParams(searchParamsString);

      Object.entries(newFilter).forEach(([key, value]) => {
        if (value) {
          params.set(key, value);
        } else {
          params.delete(key);
        }
      });
      const newParamsString = params.toString();

      if (newParamsString !== searchParamsString) {
        router.push(`${pathname}?${newParamsString}`);
      }
    },
    [searchParamsString, router, pathname],
  );

  // 무한 스크롤 훅 사용
  const { observerRef } = useInfiniteScroll({ fetchNextPage, hasNextPage, isFetchingNextPage });

  // 마감되지 않은 모임 필터 적용
  const filteredCards =
    data?.pages
      .flatMap((page) => page.data)
      .filter((card) => !card.registrationEnd || new Date(card.registrationEnd) >= new Date()) || [];

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
          <ServiceTab
            onCategoryChange={(type) => {
              handleFilterChange({ type }); // 필터링 값 업데이트
            }}
          />
          <div className="ml-auto w-[114px]">
            <Button styleType="solid" size="sm" className="h-10 px-3 md:h-11" onClick={handleOpen}>
              모임 만들기
            </Button>
            <LoginPopup
              isOpen={isAuthModalOpen}
              onClose={() => {
                setAuthModalOpen(false);
              }}
            />
          </div>
        </div>
      </div>
      <hr className="my-3" />
      <div className="px-6">
        <GatheringFilters onChange={handleFilterChange} />
        {data?.pages[0].data.length === 0 ? (
          <div className="flex h-[calc(100vh-50vh)] flex-col items-center justify-center text-center text-sm font-medium text-gray-500">
            <p>아직 모임이 없어요</p>
            <p className="mt-2">지금 바로 모임을 만들어보세요</p>
          </div>
        ) : (
          <>
            {filteredCards?.map((card) => (
              <Card key={card.id} {...card} registrationEnd={card.registrationEnd ?? ""} />
            ))}
          </>
        )}
        {/* 무한 스크롤 감지용 div */}
        <div ref={observerRef} className="h-10"></div>
        {isFetchingNextPage && <div className="text-center text-sm text-gray-500">더 불러오는 중...</div>}
      </div>

      <CreateGatheringsModal isOpen={isModalOpen} onClose={handleClose} />
    </div>
  );
}
