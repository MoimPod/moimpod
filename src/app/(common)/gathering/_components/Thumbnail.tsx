import Image from "next/image";

type ThumbnailProps = {
  imageUrl: string;
};

export default function Thumbnail({ imageUrl }: ThumbnailProps) {
  return (
    <div className="h-auto w-full overflow-hidden rounded-[24px] md:h-60 lg:h-[270px]">
      <Image
        src={imageUrl}
        alt={"모임 이미지"}
        object-fit="cover"
        priority={true}
        width={486}
        height={270}
        className="w-full rounded-[24px]"
      />
    </div>
  );
}
