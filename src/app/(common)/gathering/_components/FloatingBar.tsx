"use client";

import { useState } from "react";
import Button from "@/components/Button";
import { LoginPopup, Popup } from "@/components/Popup";
import { useUserStore } from "@/stores/useUserStore";
import { copyClipboard } from "@/utils/copyClipboard";
import { useJoin } from "../_hooks/useJoin";
import { useGetParticipants } from "../_hooks/useGetParticipants";
import { useLeaveGathering } from "@/hooks/useLeaveGathering";
import { useCancelGathering } from "../_hooks/useCancelGathering";

type FloatingBarProps = {
  gatheringId: string;
  hostUserId: number;
};

function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="fixed bottom-0 left-0 flex w-full justify-center border-t-2 border-black bg-white px-4 py-5">
      <div className="w-full max-w-[1200px] px-4 md:px-6 lg:px-[102px]">
        <div className="flex w-full justify-between">{children}</div>
      </div>
    </div>
  );
}

const MODAL = {
  join: "join",
  cancel: "cancel",
};

export default function FloatingBar({ gatheringId, hostUserId }: FloatingBarProps) {
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const { user } = useUserStore();

  const { data: participantList } = useGetParticipants(gatheringId);
  const { mutate: mutateJoin, isPending } = useJoin(gatheringId);
  const { mutate: mutateLeaveGathering } = useLeaveGathering(["participants", gatheringId]);
  const { mutate: mutateCancelGathering } = useCancelGathering();

  const participantIdList = participantList?.map((participant) => participant.userId);

  const isHost = user?.id === hostUserId;
  const isJoined = user ? participantIdList?.includes(user?.id) : false;

  const closeModal = () => setActiveModal(null);

  const handleJoin = () => {
    if (!user) {
      setActiveModal(MODAL.join);
    } else {
      // 참여하기 api 요청
      mutateJoin(gatheringId);
    }
  };

  if (isHost)
    return (
      <>
        <Container>
          <div>
            <div className="text-base font-semibold">더 건강한 나와 팀을 위한 프로그램 🏃‍️️</div>
            <div className="text-xs">국내 최고 웰니스 전문가와 프로그램을 통해 지친 몸과 마음을 회복해봐요</div>
          </div>
          <div className="flex gap-2">
            <Button styleType="outline" size="sm" className="md:w-[115px]" onClick={() => setActiveModal(MODAL.cancel)}>
              취소하기
            </Button>
            <Button styleType="solid" size="sm" className="md:w-[115px]" onClick={copyClipboard}>
              공유하기
            </Button>
          </div>
        </Container>
        {activeModal === "cancel" && (
          <Popup
            type={"confirm"}
            isOpen={!!activeModal}
            onClose={closeModal}
            onClick={() => mutateCancelGathering(gatheringId)}
          >
            <div>모임을 취소하시겠습니까?</div>
          </Popup>
        )}
      </>
    );

  return (
    <>
      <Container>
        <div>
          <div className="text-base font-semibold">더 건강한 나와 팀을 위한 프로그램 🏃‍️️</div>
          <div className="text-xs">국내 최고 웰니스 전문가와 프로그램을 통해 지친 몸과 마음을 회복해봐요</div>
        </div>
        <div className="flex gap-2">
          {user && isJoined ? (
            <Button
              styleType="outline"
              size="sm"
              className="md:w-[115px]"
              onClick={() => mutateLeaveGathering(gatheringId)}
            >
              참여 취소하기
            </Button>
          ) : (
            <Button styleType="solid" size="sm" className="md:w-[115px]" onClick={handleJoin}>
              참여하기
            </Button>
          )}
        </div>
      </Container>
      {activeModal === MODAL.join && <LoginPopup isOpen={!user && !!activeModal} onClose={closeModal} />}
    </>
  );
}
