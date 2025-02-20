import { useRef, useEffect, useCallback } from "react";

type UseInfiniteScrollProps = {
  fetchNextPage: () => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
};

export const useInfiniteScroll = ({ fetchNextPage, hasNextPage, isFetchingNextPage }: UseInfiniteScrollProps) => {
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
    if (!window.IntersectionObserver) {
      console.warn("IntersectionObserver is not supported in this browser");
      return;
    }

    try {
      const observer = new IntersectionObserver(handleObserver, { threshold: 1.0 });

      if (observerRef.current) observer.observe(observerRef.current);

      return () => {
        if (observerRef.current) observer.unobserve(observerRef.current);
      };
    } catch (error) {
      console.error("Failed to initialize IntersectionObserver:", error);
    }
  }, [handleObserver]);

  return { observerRef, isFetchingNextPage };
};
