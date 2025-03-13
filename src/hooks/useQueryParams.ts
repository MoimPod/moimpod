import { useMemo } from "react";
import type { ReadonlyURLSearchParams } from "next/navigation";

/**
 * 현재 URL의 모든 쿼리 파라미터를 객체로 변환하는 커스텀 훅
 */
export const useQueryParams = (params: ReadonlyURLSearchParams) => {
  return useMemo(() => Object.fromEntries(params), [params]);
};
