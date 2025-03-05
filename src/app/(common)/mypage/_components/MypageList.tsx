import { MyGathering } from "@/app/(common)/mypage/types";
import Spinner from "@/components/Spinner";
import { GatheringType, ReviewResponse } from "@/types";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

type GatheringListProps<T extends MyGathering | ReviewResponse | GatheringType> = {
  render: (item: T) => React.ReactNode;
  emptyMessage: string;
  queryOption: UseQueryOptions<T[], Error>;
};

export default function MypageList<T extends MyGathering | ReviewResponse | GatheringType>({
  render,
  emptyMessage,
  queryOption,
}: GatheringListProps<T>) {
  const { data, isLoading, error } = useQuery({ ...queryOption });

  if (isLoading) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <p>목록 조회 중 에러가 발생했습니다.</p>
      </div>
    );
  }
  return (
    <>
      {data?.length ? (
        <>{data.map((gathering) => render(gathering))}</>
      ) : (
        <div className="flex flex-1 items-center justify-center">
          <p>{emptyMessage}</p>
        </div>
      )}
    </>
  );
}
