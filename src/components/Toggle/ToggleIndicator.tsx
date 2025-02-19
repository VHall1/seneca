import { cn } from "../../utils";
import { useToggleContext } from "./context";

export function ToggleIndicator({
  style,
  className,
  selectedIndex,
  questionsTotal,
  ...props
}: ToggleIndicatorProps) {
  const { isOverflowing } = useToggleContext();

  if (selectedIndex === -1) {
    return null;
  }

  const indicatorSize = 100 / questionsTotal;
  let overflowingStyle: React.CSSProperties = {};
  if (isOverflowing) {
    overflowingStyle = {
      left: 0,
      width: "100%",
      height: `${indicatorSize}%`,
      top: `${selectedIndex * indicatorSize}%`,
    };
  } else {
    overflowingStyle = {
      top: 0,
      height: "100%",
      width: `${indicatorSize}%`,
      left: `${selectedIndex * indicatorSize}%`,
    };
  }

  return (
    <div
      className={cn(
        "absolute bg-white transition-all",
        {
          "rounded-full": !isOverflowing,
        },
        className
      )}
      style={{ ...overflowingStyle, ...style }}
      {...props}
    />
  );
}

interface ToggleIndicatorProps
  extends Omit<
    React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLDivElement>,
      HTMLDivElement
    >,
    "children"
  > {
  selectedIndex: number;
  questionsTotal: number;
}
