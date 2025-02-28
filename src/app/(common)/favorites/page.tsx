"use client";

import { useFavoritesStore } from "@/stores/useFavoritesStore";
import { useFetchGatherings } from "../_home/_hooks/useFetchGatherings";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import Card from "@/components/Card";
import ServiceTab from "@/components/ServiceTab";
import FavoritesLogo from "@/images/favorites_logo.svg";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo } from "react";

export default function Page() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const searchParamsString = searchParams.toString();
  const { favorites } = useFavoritesStore();

  const filters = useMemo(
    () => ({
      type: searchParams.get("type") || undefined,
    }),
    [searchParams.get("type")],
  );

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useFetchGatherings(filters);

  const allCards = data?.pages?.flatMap((page) => page.data) || [];
  // 찜한 목록에 해당하는 카드만 필터링
  const favoriteCards = allCards.filter((card) => favorites.includes(card.id.toString()));

  // favoriteCards가 없으면 자동으로 추가 데이터 요청 (불필요한 API 요청 방지)
  useEffect(() => {
    if (!isLoading && favoriteCards.length === 0 && hasNextPage) {
      fetchNextPage();
    }
  }, [favoriteCards, hasNextPage, isLoading, fetchNextPage]);

  // 필터 업데이트
  const handleFilterChange = useCallback(
    (newFilter: Partial<typeof filters>) => {
      const params = new URLSearchParams(searchParamsString);
      let hasChanged = false;

      Object.entries(newFilter).forEach(([key, value]) => {
        if (value) {
          if (params.get(key) !== value) {
            params.set(key, value);
            hasChanged = true;
          }
        } else {
          if (params.has(key)) {
            params.delete(key);
            hasChanged = true;
          }
        }
      });
      const newParamsString = params.toString();

      if (hasChanged) {
        router.push(`${pathname}?${newParamsString}`);
      }
    },
    [searchParamsString, router, pathname],
  );

  // 무한 스크롤 hook
  const { observerRef } = useInfiniteScroll({ fetchNextPage, hasNextPage, isFetchingNextPage });

  return (
    <div className="w-full">
      <div className="mb-5 flex gap-6 pt-8">
        <FavoritesLogo />
        <div>
          <div className="mb-2 text-2xl font-semibold text-gray-900">찜한 모임</div>
          <div className="text-sm font-semibold text-gray-700">마감되기 전에 지금 바로 참여해보세요 👀</div>
        </div>
      </div>
      <div className="px-6 pt-6">
        <div className="flex items-center">
          <ServiceTab
            onCategoryChange={(type) => {
              handleFilterChange({ type }); // 필터링 값 업데이트
            }}
          />
        </div>
      </div>
      <div>
        {isLoading ? ( // 첫 페이지 로딩 중일 때
          <div className="flex h-[calc(100vh-50vh)] flex-col items-center justify-center text-center text-sm font-medium text-gray-500">
            <p>모임 정보를 불러오는 중...</p>
          </div>
        ) : favoriteCards.length === 0 ? (
          <p className="flex h-[calc(100vh-50vh)] flex-col items-center justify-center text-center text-sm font-medium text-gray-500">
            아직 찜한 모임이 없습니다.
          </p>
        ) : (
          <>
            {favoriteCards.map((card) => (
              <Card key={card.id} {...card} registrationEnd={card.registrationEnd ?? ""} />
            ))}
            <div ref={observerRef} className="h-10"></div>
          </>
        )}
        {isFetchingNextPage && <div className="text-center text-sm text-gray-500">불러오는 중...</div>}
      </div>
    </div>
  );
}
