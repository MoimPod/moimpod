"use client";

import Image from "next/image";
import ListItem from "@/components/ListItem";
import { useLeaveGathering } from "@/hooks/useLeaveGathering";
import { useState } from "react";
import Button from "@/components/Button";
import ReviewModal from "@/app/(common)/mypage/_components/ReviewModal";
import MypageList from "@/app/(common)/mypage/_components/MypageList";
import { fetchMyGatherings } from "@/app/(common)/mypage/utils/apis";
import DEFAULT_IMAGE from "@/images/default_image.png";

export default function ReviewableGatherings() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedGathering, setSelectedGathering] = useState<number | null>(null);
  const handleOpen = (gatheringId: number) => {
    setSelectedGathering(gatheringId);
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
  };

  const mutation = useLeaveGathering(["my-gatherings"]);

  return (
    <>
      <MypageList
        queryOption={{
          queryKey: ["user", "reviews", "reviewable"],
          queryFn: () => fetchMyGatherings({ completed: true, reviewed: false }),
        }}
        emptyMessage={"아직 작성 가능한 리뷰가 없어요"}
        render={(gathering) =>
          !gathering.canceledAt && (
            <div className="relative py-6" key={gathering.id}>
              <ListItem
                CardImage={
                  <Image
                    src={gathering.image || DEFAULT_IMAGE}
                    alt="모임 이미지"
                    width={280}
                    height={156}
                    className="h-[156px] w-full rounded-3xl md:max-w-[280px]"
                  />
                }
                isCompleted={gathering.isCompleted}
                canceledAt={gathering.canceledAt}
                handleCancel={() => mutation.mutate(gathering.id)}
                className="justify-between"
              >
                <div className="flex flex-col gap-2.5">
                  <div className="flex flex-col gap-1">
                    <ListItem.Title title={gathering.name} subtitle={gathering.location} />
                    <ListItem.SubInfo
                      date={gathering.dateTime}
                      participantCount={gathering.participantCount}
                      capacity={gathering.capacity}
                    />
                  </div>
                </div>
                <Button
                  onClick={() => handleOpen(gathering.id)}
                  className={"mt-[18px] w-full max-w-[120px]"}
                  size={"sm"}
                  styleType={"solid"}
                  disabled={!!gathering.canceledAt}
                >
                  리뷰 작성하기
                </Button>
              </ListItem>
            </div>
          )
        }
      />
      {selectedGathering && <ReviewModal isOpen={isModalOpen} onClose={handleClose} gatheringId={selectedGathering} />}
    </>
  );
}
