import Avatar from "@/components/Avatar";

type GatheredProfilesProps = {
  profileImages: (string | null)[];
};

export default function GatheredProfiles({ profileImages }: GatheredProfilesProps) {
  const count = profileImages.length;
  return (
    <div className="flex">
      {profileImages.slice(0, 4).map((imageUrl, index) => (
        <div key={index} className={`relative ${index !== 0 ? "-ml-3" : ""}`}>
          <Avatar key={index} size={"sm"} imageUrl={imageUrl} />
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
