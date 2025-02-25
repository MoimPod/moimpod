import { QUERY_PARAMS, SORT_OPTIONS, SORT_BY, SORT_ORDER, DEFAULT_QUERY_VALUES } from "./constants";

/**
 * 현재 URLSearchParams에서 초기 필터 값을 가져오는 함수
 *
 * @param {URLSearchParams} searchParams - 현재 URL의 쿼리스트링 파라미터
 * @returns {string} - 초기 필터 값 (최신순, 리뷰 높은순, 리뷰 낮은순 중 하나)
 */
export const getInitialFilter = (searchParams: URLSearchParams) => {
  const sortBy = searchParams.get(QUERY_PARAMS.SORT_BY);
  const sortOrder = searchParams.get(QUERY_PARAMS.SORT_ORDER);

  if (sortBy === SORT_BY.SCORE && sortOrder === SORT_ORDER.ASC) {
    return SORT_OPTIONS.SCORE_ASC;
  }
  if (sortBy === SORT_BY.SCORE && sortOrder === SORT_ORDER.DESC) {
    return SORT_OPTIONS.SCORE_DESC;
  }
  return SORT_OPTIONS.LATEST;
};
