import { cn } from "../../../utils/cn";
import { useToggleOverflowingContext } from "./context";

export function ToggleIndicator({
  selectedIndex,
  questionsTotal,
}: ToggleIndicatorProps) {
  const { isOverflowing } = useToggleOverflowingContext();

  if (selectedIndex === -1) {
    return null;
  }

  const indicatorSize = 100 / questionsTotal;
  let style: React.CSSProperties = {};
  if (isOverflowing) {
    style = {
      left: 0,
      width: "100%",
      height: `${indicatorSize}%`,
      top: `${selectedIndex * indicatorSize}%`,
    };
  } else {
    style = {
      top: 0,
      height: "100%",
      width: `${indicatorSize}%`,
      left: `${selectedIndex * indicatorSize}%`,
    };
  }

  return (
    <div
      className={cn("absolute bg-white transition-all", {
        "rounded-full": !isOverflowing,
      })}
      style={style}
    />
  );
}

interface ToggleIndicatorProps {
  selectedIndex: number;
  questionsTotal: number;
}
