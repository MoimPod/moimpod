import Card from "@/components/Card/Card";
import Image from "next/image";

export default function CardList() {
  return (
    <div>
      <div className="flex">
        <Image src={"/images/main_card_list_logo.svg"} alt={"main logo"} width={72} height={72} />
        <div>
          <div className="font-pretendard">함께할 사람이 없나요?</div>
          <div className="font-pretendard">지금 모임에 참여해보세요</div>
        </div>
      </div>

      <div className="">카테고리</div>
      <div>
        <Card
          name="달빛 오피스 스트레칭"
          dateTime="2025-02-06T17:30:00"
          registrationEnd="2025-02-06T17:30:00"
          location="서울 강남구"
          participantCount={16}
          capacity={20}
        />
        <Card
          name="달빛 오피스 스트레칭"
          dateTime="2025-02-06T17:30:00"
          registrationEnd="2025-02-06T17:30:00"
          location="서울 강남구"
          participantCount={16}
          capacity={20}
        />
      </div>
    </div>
  );
}
