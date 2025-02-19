import ServiceTab from "@/app/(common)/_home/_components/ServiceTab";
import FavoritesLogo from "@/images/favorites_logo.svg";

export default function Page() {
  return (
    <div>
      <div className="mb-5 flex gap-6 pt-8">
        <FavoritesLogo />
        <div>
          <div className="mb-2 text-sm font-semibold text-gray-700">찜한 모임</div>
          <div className="text-2xl font-semibold text-gray-900">마감되기 전에 지금 바로 참여해보세요👀</div>
        </div>
      </div>
      <div className="px-6 pt-6">
        <div className="flex items-center">
          <ServiceTab />
        </div>
      </div>
    </div>
  );
}
