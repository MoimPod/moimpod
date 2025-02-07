import Image from "next/image";
import testImg from "@/images/auth_main_img.png";
import Check from "@/images/check.svg";
import Person from "@/images/person.svg";
import Button from "@/components/Button";

export default function ListItem() {
  return (
    <div className="flex w-full flex-col items-stretch gap-4 md:flex-row">
      <Image
        src={testImg}
        alt="모임 이미지"
        width={280}
        height={156}
        className="h-[156px] w-full max-w-[311px] rounded-3xl md:w-[280px]"
      />
      {/* 모임 정보 **/}
      <div className="flex flex-col">
        <div className="mb-[11px] flex gap-2">
          <div className="break-keep rounded-3xl bg-orange-100 px-3 py-[6px] text-sm text-orange-600">이용 예정</div>
          <div className="flex items-center gap-1 break-keep rounded-3xl border border-orange-100 bg-white px-3 py-[6px] text-sm text-orange-600">
            <Check />
            개설 확정
          </div>
        </div>
        <div className="mb-[5px] flex w-full max-w-[311px] items-center">
          <span className="text-lg font-semibold">
            달램핏 오피스 스트레칭 | <span className="text-sm">을지로 3가</span>
          </span>
        </div>
        <div className="mb-4 flex items-center gap-3 text-sm">
          <span>1월 7일 · 17:30 </span>
          <div className="flex items-center gap-[2px] text-gray-700">
            <Person />
            <span>20/20</span>
          </div>
        </div>
        <div>
          <Button className="w-[120px]" size="sm" styleType="outline">
            예약 취소하기
          </Button>
        </div>
      </div>
    </div>
  );
}
