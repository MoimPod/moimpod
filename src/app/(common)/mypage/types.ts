export type MyGathering = {
  teamId: number; // 팀 id
  id: number; // 모임 id
  type: "DALLAEMFIT" | "OFFICE_STRETCHING" | "MINDFULNESS" | "WORKATION"; // 모임 서비스 종류
  name: string; // 모임의 이름
  dateTime: string; // 모임 날짜 및 시간
  registrationEnd: string; // 모집 마감 날짜 및 시간
  location: string; // 모임 장소
  participantCount: number; // 현재 참여자 수
  capacity: number; // 정원
  image: string; // 이미지 url
  createdBy: number; // 모임 생성s자 id
  canceledAt: string | null; // 모임 취소 날짜 및 시간
  joinedAt: string; // 사용자가 모임 참여 신청한 일자
  isCompleted: boolean; // 모임 종료 여부
  isReviewed: boolean; // 리뷰 작성 여부
};
