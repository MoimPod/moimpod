import { QUERY_PARAMS, SORT_VALUE, SORT_BY, SORT_ORDER } from "./constants";

/**
 * 현재 URLSearchParams에서 정렬값을 가져오는 함수
 *
 * @param 현재 URL의 쿼리스트링 파라미터
 * @returns 정렬값 (최신순, 리뷰 높은순, 리뷰 낮은순 중 하나)
 */
export const getSortValue = (searchParams: URLSearchParams) => {
  const sortBy = searchParams.get(QUERY_PARAMS.sortBy);
  const sortOrder = searchParams.get(QUERY_PARAMS.sortOrder);

  if (sortBy === SORT_BY.score && sortOrder === SORT_ORDER.desc) {
    return SORT_VALUE.highScore;
  }

  if (sortBy === SORT_BY.score && sortOrder === SORT_ORDER.asc) {
    return SORT_VALUE.lowScore;
  }

  return SORT_VALUE.latest;
};
