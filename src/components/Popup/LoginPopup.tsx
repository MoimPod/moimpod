import { useRouter } from "next/navigation";
import Popup from "@/components/Popup/Popup";

type LoginPopupProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function LoginPopup({ isOpen, onClose }: LoginPopupProps) {
  const router = useRouter();
  return (
    <Popup isOpen={isOpen} onClose={onClose} type="alert" onClick={() => router.push("/sign-in")}>
      <div>로그인이 필요합니다.</div>
    </Popup>
  );
}
