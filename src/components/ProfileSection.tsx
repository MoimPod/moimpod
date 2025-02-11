import Edit from "@/images/edit.svg";
import Profile from "@/images/profile.svg";

export default function ProfileSection() {
  return (
    <section className="relative h-[178px] w-full rounded-3xl border-2 border-gray-200 bg-white">
      <div className="flex h-[64px] w-full items-start justify-between rounded-t-3xl bg-[url('/images/profile_background.svg')] bg-cover bg-center px-6 pt-4">
        <span className="text-lg font-semibold">내 프로필</span>
        <button>
          <Edit width="32" height="32" />
        </button>
      </div>
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
    </section>
  );
}
