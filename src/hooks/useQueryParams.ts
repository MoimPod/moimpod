import { useSearchParams } from "next/navigation";

// 현재 url의 모든 쿼리 파리미터 객체로 리턴
export const useQueryParams = () => {
  const params = useSearchParams();
  return Object.fromEntries(params);
};
