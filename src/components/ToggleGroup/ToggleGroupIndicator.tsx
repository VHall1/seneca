export function ToggleGroupIndicator({
  selectedIndex,
  questionsTotal,
}: ToggleGroupIndicatorProps) {
  if (selectedIndex === -1) {
    return null;
  }

  const width = 100 / questionsTotal;

  return (
    <div
      className="absolute bg-white transition-all"
      style={{
        top: 0,
        height: "100%",
        width: `${width}%`,
        left: `${selectedIndex * width}%`,
      }}
    />
  );
}

interface ToggleGroupIndicatorProps {
  selectedIndex: number;
  questionsTotal: number;
}
