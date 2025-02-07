type SpinnerProps = {
  color?: "gray" | "white";
};

export default function Spinner({ color = "gray" }: SpinnerProps) {
  const spinnerColors = {
    white: "border-white border-t-transparent",
    gray: "border-gray-400 border-t-transparent",
  };
  return <span className={`size-5 animate-spin rounded-full border-2 ${spinnerColors[color]}`}></span>;
}
