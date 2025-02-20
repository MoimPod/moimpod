import LikeButton from "@/components/LikeButton";

type InactiveLayerProps = {
  onClick: () => void;
  message: "마감된 챌린지예요" | "모집 취소된 모임이에요";
};
export default function InactiveLayer({ onClick, message }: InactiveLayerProps) {
  return (
    <div className="absolute flex h-full w-full flex-col-reverse items-center justify-center gap-6 rounded-3xl bg-black bg-opacity-80 md:flex-col">
      <LikeButton className="md:absolute md:right-6 md:top-6 md:ml-auto" isClosed onClick={onClick} isLiked={false} />
      <p className="text-center text-sm text-white">
        {message}, <br />
        다음 기회에 만나요🙏🏻
      </p>
    </div>
  );
}
