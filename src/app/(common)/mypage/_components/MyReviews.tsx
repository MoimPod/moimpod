import { useGetMyReviews } from "@/app/(common)/mypage/_hooks/useGetMyReviews";
import ListItem from "@/components/ListItem";
import Score from "@/components/Score";
import Spinner from "@/components/Spinner";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { useUserStore } from "@/stores/useUserStore";
import Image from "next/image";

const GatheringType = {
  OFFICE_STRETCHING: "달램핏 오피스 스트레칭",
  MINDFULNESS: "달램핏 마인드풀니스",
  WORKATION: "워케이션",
};
export default function MyReviews() {
  const id = useUserStore((state) => state.user?.id) as number;
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, error } = useGetMyReviews(id);

  const { observerRef } = useInfiniteScroll({
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  });

  const allReviews = data?.pages.flatMap((page) => page.data.data) ?? [];

  if (isLoading)
    return (
      <div className="flex flex-1 items-center justify-center">
        <Spinner />
      </div>
    );
  if (error)
    return (
      <div className="flex flex-1 items-center justify-center">
        <p>목록 조회 중 에러가 발생했습니다.</p>
      </div>
    );
  return (
    <>
      {allReviews.length ? (
        <>
          <div className="w-full">
            <div className="flex-1 divide-y-2 divide-dashed">
              {allReviews.map((review) => (
                <div className="relative py-6" key={review.id}>
                  <ListItem
                    CardImage={
                      <Image
                        src={review.Gathering.image}
                        alt="모임 이미지"
                        width={280}
                        height={156}
                        className="h-[156px] w-full rounded-3xl md:max-w-[280px]"
                      />
                    }
                    className="justify-between"
                  >
                    <div className="flex flex-col gap-2">
                      <div className="flex flex-col gap-2.5">
                        <Score score={review.score} />
                        <ListItem.Body>{review.comment}</ListItem.Body>
                        <ListItem.ServiceInfo>
                          {GatheringType[review.Gathering.type]} 이용 · {review.Gathering.location}
                        </ListItem.ServiceInfo>
                      </div>
                      <ListItem.MetaInfo secondary={review.createdAt} />
                    </div>
                  </ListItem>
                </div>
              ))}
            </div>
            <div ref={observerRef} className="h-10" />
            {isFetchingNextPage && <div className="text-center text-sm text-gray-500">더 불러오는 중...</div>}
          </div>
        </>
      ) : (
        <div className="flex flex-1 items-center justify-center">
          <p>아직 작성한 리뷰가 없어요</p>
        </div>
      )}
    </>
  );
}
