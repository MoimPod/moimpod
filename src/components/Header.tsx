import Image from "next/image";

export default function Header() {
  return (
    <header className="bg-orange-600">
      <Image src={"/images/desktop_logo.svg"} alt={"로고"} width={75} height={35} />
    </header>
  );
}
