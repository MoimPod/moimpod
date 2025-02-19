"use client";

import { useState } from "react";
import Button from "@/components/Button";
import Modal from "@/components/Modal";
import LoginModal from "@/components/LoginModal";
import { useUserStore } from "@/stores/useUserStore";
import { copyClipboard } from "@/utils/copyClipboard";
import { useJoin } from "../_hooks/useJoin";
import { useGetParticipants } from "../_hooks/useGetParticipants";
import { useLeaveGathering } from "../_hooks/useLeaveGathering";
import { useCancelGathering } from "../_hooks/useCancelGathering";

type FloatingBarProps = {
  gatheringId: string;
  hostUserId: number;
};

function Container({ children }: { children: React.ReactNode }) {
  return <div className="sticky bottom-0 flex w-full border-t-2 bg-white px-4 py-5">{children}</div>;
}

const MODAL = {
  join: "join",
  cancel: "cancel",
};

export default function FloatingBar({ gatheringId, hostUserId }: FloatingBarProps) {
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const { user } = useUserStore();

  const { data: participantIdList } = useGetParticipants(gatheringId);
  const { mutate: mutateJoin, isPending } = useJoin(gatheringId);
  const { mutate: mutateLeaveGathering } = useLeaveGathering(gatheringId);
  const { mutate: mutateCancelGathering } = useCancelGathering();

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
          <Button styleType="outline" size="sm" className="md:w-[115px]" onClick={() => setActiveModal(MODAL.cancel)}>
            취소하기
          </Button>
          <Button styleType="solid" size="sm" className="md:w-[115px]" onClick={copyClipboard}>
            공유하기
          </Button>
        </Container>
        <Modal isOpen={!!activeModal} onClose={closeModal}>
          {activeModal === "cancel" && (
            <>
              <div>모임을 취소하시겠습니까?</div>
              <div className="flex">
                <Button styleType="outline" onClick={closeModal}>
                  아니요
                </Button>
                <Button onClick={() => mutateCancelGathering(gatheringId)}>예</Button>
              </div>
            </>
          )}
        </Modal>
      </>
    );

  return (
    <>
      <Container>
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
      </Container>
      {activeModal === MODAL.join && <LoginModal isOpen={!user && !!activeModal} onClose={closeModal} />}
    </>
  );
}
