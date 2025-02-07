import Image from "next/image";
import testImg from "@/images/auth_main_img.png";

export default function ListItem() {
  return (
    <div>
      <div>
        <Image src={testImg} alt="모임 이미지" width={280} height={156} className="w-full max-w-[311px] rounded-3xl" />
      </div>
    </div>
  );
}
