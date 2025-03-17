import { useRef, useEffect, useCallback } from "react";

type UseInfiniteScrollProps = {
  fetchNextPage: () => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
};

export const useInfiniteScroll = ({ fetchNextPage, hasNextPage, isFetchingNextPage }: UseInfiniteScrollProps) => {
  // 감지할 요소의 ref
  const observerRef = useRef<HTMLDivElement | null>(null);

  // IntersectionObserver 인스턴스를 저장할 ref
  const observerInstanceRef = useRef<IntersectionObserver | null>(null);

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
    const node = observerRef.current;

    if (node && !observerInstanceRef.current) {
      const observer = new IntersectionObserver(handleObserver, {
        rootMargin: "50px", // 요소가 보이기 50px 전에 미리 감지
        threshold: 0.5, // 50% 이상 보일 때만 실행
      });

      observer.observe(node);
      observerInstanceRef.current = observer;
    }

    return () => {
      observerInstanceRef.current?.disconnect(); // 클린업
      observerInstanceRef.current = null;
    };
  }, [handleObserver]);

  return { observerRef };
};
