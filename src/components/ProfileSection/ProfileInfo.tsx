import Profile from "@/images/profile.svg";

// 프로필 이미지, 이름, 회사, 이메일 등 사용자 정보를 표시
export default function ProfileInfo() {
  return (
    <div className="flex w-full flex-col gap-2 pl-24 pt-3">
      <Profile width="56" height="56" className="absolute left-6 top-[54px]" />
      <span>럽윈즈올</span>
      <div className="flex flex-col gap-1">
        <div className="text-sm">
          <span className="font-medium text-gray-800">company. </span>
          <span className="text-gray-700">코드잇</span>
        </div>
        <div className="text-sm">
          <span className="font-medium text-gray-800">E-mail. </span>
          <span className="text-gray-700">codeit@codeit.com</span>
        </div>
      </div>
    </div>
  );
}
