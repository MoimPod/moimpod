import ProfileSection from "@/components/ProfileSection/ProfileSection";

export default function Page() {
  return (
    <div className="flex flex-col gap-[30px] pt-8">
      <div className="flex flex-col gap-6">
        <h2 className="text-2xl font-semibold">마이 페이지</h2>
        <ProfileSection />
      </div>
      <div className="border-t-2 border-gray-900 bg-white px-6 pt-6"></div>
    </div>
  );
}
