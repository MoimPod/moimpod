import Heart from "@/images/heart.svg";

type ScoreProps = {
  score: number;
};

export default function Score({ score }: ScoreProps) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: score }, (_, index) => (
        <Heart key={index} className={`${index < score ? "fill-red-600" : "fill-gray-200"} stroke-none`} />
      ))}
    </div>
  );
}
