import Image from "next/image";
import DesktopLogo from "../public/images/desktop_logo.svg";

export default function Header() {
  return (
    <header className="bg-black">
      <Image src={DesktopLogo} alt={"로고"} width={75} height={35} />
    </header>
  );
}
