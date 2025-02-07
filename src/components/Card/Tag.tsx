import Image from "next/image";

type TagProps = {
  text: string;
};

export default function Tag({ text }: TagProps) {
  return (
    <div className="absolute right-0 top-0 flex items-center justify-center rounded-bl-lg rounded-tr-3xl bg-orange-500 px-3 py-1 text-sm font-medium text-white md:rounded-tr-none lg:rounded-tr-none">
      <Image src={"/images/alram.svg"} alt={"알림 ic"} width={24} height={24} />

      <span className="ml-1">{text}</span>
    </div>
  );
}
