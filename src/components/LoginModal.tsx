import Button from "@/components/Button";
import Modal from "@/components/Modal";
import { useRouter } from "next/navigation";

type LoginModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const router = useRouter();
  return (
    <Modal isOpen={isOpen} onClose={onClose} className="w-full max-w-[450px]">
      <div className="flex h-[151px] w-full flex-col items-center justify-between font-medium">
        <div className="flex flex-1 items-center">로그인이 필요합니다.</div>
        <Button
          onClick={() => {
            onClose();
            router.push("/sign-in");
          }}
          className="w-32"
        >
          확인
        </Button>
      </div>
    </Modal>
  );
}
