import MypageContent from "@/app/(common)/mypage/_components/MypageContent";
import ProfileSection from "@/app/(common)/mypage/_components/ProfileSection/ProfileSection";

export default function Page() {
  return (
    <div className="flex flex-1 flex-col gap-[30px] pt-8">
      <div className="flex flex-col gap-6">
        <h2 className="text-2xl font-semibold">마이 페이지</h2>
        <ProfileSection />
      </div>
      {/* 마이페이지의 콘텐츠 */}
      <MypageContent />
    </div>
  );
}
