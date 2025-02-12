import Avatar from "@/components/Avatar";

export default function GatheredProfiles({ count }: { count: number }) {
  return (
    <div className="flex">
      {[...Array(count)].slice(0, 4).map((_, index) => (
        <div key={index} className={`relative ${index !== 0 ? "-ml-3" : ""}`}>
          <Avatar key={index} />
        </div>
      ))}
      {count > 4 ? (
        <div className="z-50 -ml-3 flex h-[30px] w-[30px] items-center justify-center rounded-full bg-gray-100 text-sm font-semibold">
          {`+${count - 4}`}
        </div>
      ) : null}
    </div>
  );
}
