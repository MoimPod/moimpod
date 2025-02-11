"use client";

import React from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Card from "@/components/Card";
import { useFetchGatherings } from "./_hooks/useFetchGatherings";
import Image from "next/image";
import CategoryButton from "./CategoryButton";
import LocationSelect from "./LocationSelect";
import ServiceTab from "./ServiceTab";
import DateSelect from "./DateSelect";

export type CardData = {
  id: number;
  name: string;
  location: string;
  dateTime: string;
  registrationEnd: string | null;
  participantCount: number;
  capacity: number;
  image: string;
};
export default function CardList() {
  const teamId = 3;

  const { data: cards = [], isLoading, error } = useFetchGatherings(teamId);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>데이터를 불러오는 중 오류가 발생했습니다.</div>;

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
        <ServiceTab />
        <CategoryButton />
      </div>
      <hr />
      <div>
        <div className="my-3 flex gap-3">
          <LocationSelect />
          <DateSelect />
        </div>
        {cards.map((card) => (
          <Card key={card.id} {...card} registrationEnd={card.registrationEnd ?? ""} />
        ))}
      </div>
    </div>
  );
}
