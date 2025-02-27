"use client";

import CreateGatheringsModal from "@/app/(common)/_home/_components/CreateGatheringsModal";
import GatheringFilters from "@/app/(common)/_home/_components/GatheringFilters";
import { useCheckAuth } from "@/app/(common)/_home/_hooks/useCheckAuth";
import { useFetchGatherings } from "@/app/(common)/_home/_hooks/useFetchGatherings";
import Button from "@/components/Button";
import Card from "@/components/Card";
import { LoginPopup } from "@/components/Popup";
import ServiceTab from "@/components/ServiceTab";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import GatheringLogo from "@/images/gathering_logo.svg";
import { useUserStore } from "@/stores/useUserStore";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";

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

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useFetchGatherings(filters);

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
      <div className="mb-5 flex flex-row items-center gap-4 pl-3 pt-10">
        <GatheringLogo />
        <div>
          <div className="mb-2 text-sm font-semibold text-gray-700">함께할 사람이 없나요?</div>
          <div className="text-lg font-semibold text-gray-900 lg:text-2xl">지금 모임에 참여해보세요</div>
        </div>
      </div>
      <div className="relative mt-6">
        <div className="flex flex-row gap-2">
          <ServiceTab
            onCategoryChange={(type) => {
              handleFilterChange({ type }); // 필터링 값 업데이트
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
      <div className="">
        <GatheringFilters onChange={handleFilterChange} />
        {isLoading ? ( // 첫 페이지 로딩 중일 때
          <div className="flex h-[calc(100vh-50vh)] flex-col items-center justify-center text-center text-sm font-medium text-gray-500">
            <p>모임 정보를 불러오는 중...</p>
          </div>
        ) : data?.pages[0].data.length === 0 ? ( // 첫 페이지 로딩 후 데이터 없을 때
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
        {!isLoading && <div ref={observerRef} className="h-10"></div>}
        {/* 추가 데이터를 불러올 때만 메시지 표시 */}
        {!isLoading && isFetchingNextPage && <div className="text-center text-sm text-gray-500">불러오는 중...</div>}
      </div>

      <CreateGatheringsModal isOpen={isModalOpen} onClose={handleClose} />
    </div>
  );
}
