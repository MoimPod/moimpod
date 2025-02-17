type ProgressBarProps = {
  progress: number;
};

export default function ProgressBar({ progress }: ProgressBarProps) {
  return (
    <div className="h-1.5 w-full rounded-full bg-sky-100">
      <div className="h-1.5 rounded-full bg-primary-color" style={{ width: `${progress}%` }}></div>
    </div>
  );
}
