// components/Card/ProgressBar.tsx

type ProgressBarProps = {
  progress: number;
};

export default function ProgressBar({ progress }: ProgressBarProps) {
  return (
    <div className="h-1.5 w-full rounded-full bg-orange-100 dark:bg-gray-700">
      <div className="h-1.5 rounded-full bg-orange-600" style={{ width: `${progress}%` }}></div>
    </div>
  );
}
