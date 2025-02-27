import MypageList from "@/app/(common)/mypage/_components/MypageList";
import { useGetUserInfo } from "@/app/(common)/mypage/_hooks/useGetUserInfo";
import ListItem from "@/components/ListItem";
import Score from "@/components/Score";
import axiosInstance from "@/lib/axiosInstance";
import Image from "next/image";
import { Reviews } from "@/app/(common)/mypage/types";
import DEFAULT_IMAGE from "@/images/default_image.png";
const GatheringType = {
  OFFICE_STRETCHING: "달램핏 오피스 스트레칭",
  MINDFULNESS: "달램핏 마인드풀니스",
  WORKATION: "워케이션",
  DALLAEMFIT: "달램핏",
};

const fetchMyReviews = async (userId: number) => {
  const response = await axiosInstance.get<Reviews>("reviews", {
    params: {
      limit: 100,
      userId,
    },
  });

  return response.data.data;
};

export default function MyReviews() {
  const { data: userData } = useGetUserInfo();

  return (
    <>
      <MypageList
        queryOption={{
          queryKey: ["user", "reviews", "written"],
          queryFn: () => fetchMyReviews(userData?.id || 0),
        }}
        emptyMessage={"아직 작성 가능한 리뷰가 없어요"}
        render={(review) => (
          <ListItem
            CardImage={
              <Image
                src={review.Gathering.image || DEFAULT_IMAGE}
                alt={`${review.Gathering.name} 이미지`}
                width={280}
                height={156}
                className="h-[156px] w-full rounded-3xl md:max-w-[280px]"
              />
            }
            key={review.id}
            className="w-full justify-between"
          >
            <div className="flex h-full w-full flex-col gap-2 border-b-2 border-dashed pb-6">
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
        )}
      />
    </>
  );
}
