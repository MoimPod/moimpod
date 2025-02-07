"use client";

import React, { useEffect } from "react";
import { useCardStore, CardData } from "@/stores/useCardStore";
import Card from "@/components/Card/Card";
import Image from "next/image";
import CategoryButton from "./CategoryButton";
import LocationSelect from "./LocationSelect";

export default function CardList() {
  const { cards, setCards } = useCardStore();

  return (
    <div className="px-20 pt-10">
      <div className="mb-5 flex gap-6">
        <Image src={"/images/main_card_list_logo.svg"} alt={"main logo"} width={72} height={72} />
        <div>
          <div className="mb-2 text-sm font-semibold text-gray-700">함께할 사람이 없나요?</div>
          <div className="text-2xl font-semibold text-gray-900">지금 모임에 참여해보세요</div>
        </div>
      </div>

      <div>
        <div className="flex gap-6">
          <div>달램핏</div>
          <div>위케이션</div>
        </div>
        <CategoryButton />
      </div>
      <hr />
      <div>
        <div>
          <LocationSelect />
        </div>
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
