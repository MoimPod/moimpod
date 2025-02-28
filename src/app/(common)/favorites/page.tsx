"use client";

import { useFavoritesStore } from "@/stores/useFavoritesStore";
import { useFetchGatherings } from "../_home/_hooks/useFetchGatherings";
import FavoriteList from "./FavoriteList";
import ServiceTab from "@/components/ServiceTab";
import FavoritesLogo from "@/images/favorites_logo.svg";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Suspense, useCallback, useEffect } from "react";

export default function Page() {
  return (
    <Suspense>
      <FavoritesPage />
    </Suspense>
  );
}

function FavoritesPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const { favorites } = useFavoritesStore();

  const type = searchParams.get("type") || undefined;

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useFetchGatherings({ type });

  // 모든 카드 가져오기 & 찜한 카드 필터링
  const allCards = data?.pages?.flatMap((page) => page.data) || [];
  const favoriteCards = allCards.filter((card) => favorites.includes(card.id.toString()));

  // 찜한 모임이 없을 경우, 자동으로 추가 데이터 요청
  useEffect(() => {
    if (!isLoading && favoriteCards.length === 0 && hasNextPage) {
      fetchNextPage();
    }
  }, [favoriteCards, hasNextPage, isLoading, fetchNextPage]);

  // 필터 업데이트 함수
  const handleFilterChange = useCallback(
    (newType: string | undefined) => {
      const params = new URLSearchParams(searchParams.toString());
      if (newType) {
        params.set("type", newType);
      } else {
        params.delete("type");
      }
      router.push(`${pathname}?${params.toString()}`);
    },
    [searchParams, router, pathname],
  );

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
        <ServiceTab searchParams={searchParams} onCategoryChange={handleFilterChange} />
      </div>
      <FavoriteList
        isLoading={isLoading}
        favoriteCards={favoriteCards}
        isFetchingNextPage={isFetchingNextPage}
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage}
      />
    </div>
  );
}
