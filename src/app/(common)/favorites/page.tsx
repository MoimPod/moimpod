"use client";

import { useFavoritesStore } from "@/stores/useFavoritesStore";
import { useFetchGatherings } from "../_home/_hooks/useFetchGatherings";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import Card from "@/components/Card";
import ServiceTab from "@/app/(common)/_home/_components/ServiceTab";
import FavoritesLogo from "@/images/favorites_logo.svg";
import { useEffect } from "react";

export default function Page() {
  const { favorites } = useFavoritesStore();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useFetchGatherings();

  // data가 존재하는지 확인하고, pages 내부의 데이터를 모두 합친 후 필터링
  const allCards = data?.pages?.flatMap((page) => page.data) || [];

  // 찜한 목록에 해당하는 카드만 필터링
  const favoriteCards = allCards.filter((card) => favorites.includes(card.id.toString()));

  // favoriteCards가 없으면 자동으로 추가 데이터 요청
  useEffect(() => {
    if (favoriteCards.length === 0 && hasNextPage) {
      fetchNextPage();
    }
  }, [favoriteCards, hasNextPage, fetchNextPage]);

  // 무한 스크롤 hook
  const { observerRef } = useInfiniteScroll({ fetchNextPage, hasNextPage, isFetchingNextPage });

  return (
    <div className="w-full">
      <div className="mb-5 flex gap-6 pt-8">
        <FavoritesLogo />
        <div>
          <div className="mb-2 text-sm font-semibold text-gray-700">찜한 모임</div>
          <div className="text-2xl font-semibold text-gray-900">마감되기 전에 지금 바로 참여해보세요👀</div>
        </div>
      </div>
      <div className="px-6 pt-6">
        <div className="flex items-center">
          <ServiceTab />
        </div>
      </div>
      <div>
        {favoriteCards.length === 0 ? (
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
        {isFetchingNextPage && <div className="text-center text-sm text-gray-500">더 불러오는 중...</div>}
      </div>
    </div>
  );
}
