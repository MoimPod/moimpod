import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky z-50 h-[56px] border-b-2 border-black bg-orange-600 px-4 md:h-[60px]">
      <div className="m-auto flex h-full max-w-[1200px] flex-row items-center justify-between">
        <nav className="flex h-full flex-row items-center gap-3 md:gap-6">
          {/* 768px 이하에서 보이는 로고 */}
          <Link href={"/"} className="block md:hidden">
            <Image src={"/images/mobile_logo.svg"} alt={"모바일 로고"} width={56} height={27} />
          </Link>
          {/* 768px 이상에서 보이는 로고 */}
          <Link href={"/"} className="hidden md:block">
            <Image src={"/images/desktop_logo.svg"} alt={"데스크탑 로고"} width={73} height={35} />
          </Link>
          <Link href={"/"} className="header-link">
            모임 찾기
          </Link>
          <Link href={"/favorites"} className="header-link">
            찜한 모임
          </Link>
          <Link href={"/reviews"} className="header-link">
            모든 리뷰
          </Link>
        </nav>
        <Link href={"/sign-in"} className="header-link">
          로그인
        </Link>
      </div>
    </header>
  );
}
