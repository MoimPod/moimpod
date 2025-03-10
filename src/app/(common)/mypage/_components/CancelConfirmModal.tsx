import Button from "@/components/Button";
import Modal from "@/components/Modal";
import { useLeaveGathering } from "@/hooks/useLeaveGathering";
import { MouseEvent, useState } from "react";
type CancelConfirmModalProps = {
  isOpen: boolean;
  onClose: () => void;
  gatheringId: number;
  handleModalClose: () => void;
};
export default function CancelConfirmModal({
  isOpen,
  onClose,
  gatheringId,
  handleModalClose,
}: CancelConfirmModalProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const mutation = useLeaveGathering(["user", "gatherings"]);
  const handleErrorModalClose = () => {
    setIsModalOpen(false);
  };
  const handleCancelGathering = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    mutation.mutate(gatheringId as number, {
      onSuccess: () => {
        handleModalClose();
      },
      onError: () => {
        setIsModalOpen(true);
      },
    });
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <div className="w-full max-w-[340px]">
          <p className="m-12 break-keep text-center text-sm font-medium text-gray-900 md:text-base">
            예약을 취소하시겠어요?
          </p>
          <div className="m-auto flex w-full gap-2">
            <Button styleType="outline" onClick={onClose} size="sm" className="w-full">
              닫기
            </Button>
            <Button
              disabled={mutation.isPending}
              onClick={handleCancelGathering}
              size="sm"
              className="w-full"
              loading={mutation.isPending}
            >
              확인
            </Button>
          </div>
        </div>
      </Modal>
      <Modal isOpen={isModalOpen} onClose={handleErrorModalClose}>
        <div className="w-full min-w-[252px]">
          <p className="py-12 text-center text-base font-medium text-gray-900">에러: {mutation.error?.message}</p>
          <div className="m-auto flex w-[120px]">
            <Button onClick={handleErrorModalClose} size="sm" className="w-full">
              확인
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
