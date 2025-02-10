import Person from "@/images/person.svg";

type CapacityStatusProps = {
  participantCount: number;
  capacity: number;
};

export default function CapacityStatus({ participantCount, capacity }: CapacityStatusProps) {
  return (
    <div className="flex items-center gap-[2px] text-gray-700">
      <Person />
      <span>
        {participantCount}/{capacity}
      </span>
    </div>
  );
}
