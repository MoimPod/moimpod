import Button from "@/components/Button";
import Modal from "@/components/Modal";
type CancelConfirmModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (e: React.MouseEvent<HTMLButtonElement>) => Promise<void>;
};
export default function CancelConfirmModal({ isOpen, onClose, onConfirm }: CancelConfirmModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="w-full max-w-[340px]">
        <p className="m-12 break-keep text-center text-sm font-medium text-gray-900 md:text-base">
          예약을 취소하시겠어요?
        </p>
        <div className="m-auto flex w-full gap-2">
          <Button styleType="outline" onClick={onClose} size="sm" className="w-full">
            닫기
          </Button>
          <Button onClick={onConfirm} size="sm" className="w-full">
            확인
          </Button>
        </div>
      </div>
    </Modal>
  );
}
