export const REVIEW_LIMIT = 4; // 한 페이지에 보여줄 리뷰 개수

export const SORT_OPTIONS = {
  LATEST: "latest",
  SCORE_DESC: "score-desc",
  SCORE_ASC: "score-asc",
};

export const QUERY_PARAMS = {
  GATHERING_ID: "gatheringId",
  SORT_BY: "sortBy",
  SORT_ORDER: "sortOrder",
  OFFSET: "offset",
  LIMIT: "limit",
} as const;

export const SORT_BY = {
  CREATED_AT: "createdAt",
  SCORE: "score",
  PARTICIPANT_COUNT: "participantCount",
} as const;

export const SORT_ORDER = {
  DESC: "desc",
  ASC: "asc",
} as const;

export const DEFAULT_QUERY_VALUES = {
  [QUERY_PARAMS.SORT_BY]: "createdAt",
  [QUERY_PARAMS.SORT_ORDER]: "desc",
  [QUERY_PARAMS.OFFSET]: "0",
  [QUERY_PARAMS.LIMIT]: REVIEW_LIMIT.toString(),
} as const;
