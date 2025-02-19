import { useEffect, useRef } from "react";
import { cn } from "../../../utils/cn";
import { useToggleOverflowingContext } from "./context";

export function ToggleItem({
  name,
  label,
  checked,
  disabled,
  value,
  onChange,
}: ToggleItemProps) {
  const ref = useRef<HTMLLabelElement>(null);

  const { setIsOverflowing } = useToggleOverflowingContext();
  const windowSizeRef = useRef(-1);

  useEffect(() => {
    const checkOverflow = () => {
      if (!ref.current) return false;

      const windowWidth = window.innerWidth;
      const overflowing = ref.current.scrollWidth > ref.current.clientWidth;

      // store the largest screen size that overflows to avoid flickering
      // on smaller screen sizes
      if (overflowing && windowWidth > windowSizeRef.current) {
        windowSizeRef.current = windowWidth;
        setIsOverflowing(overflowing);
        return;
      }
      // if we happento go back to a larger screen size, reset the "lock"
      // and update overflowing state
      if (windowWidth > windowSizeRef.current) {
        windowSizeRef.current = -1;
        setIsOverflowing(overflowing);
      }
    };

    checkOverflow();

    window.addEventListener("resize", checkOverflow);
    return () => window.removeEventListener("resize", checkOverflow);
  }, []);

  return (
    <label
      className={cn(
        "overflow-hidden whitespace-nowrap text-white text-center text-[18px]/[1.6] lg:text-[24px]/[1.6] font-bold flex-1 py-2.5 lg:py-5 z-10",
        {
          "text-gray-500": checked,
        }
      )}
      ref={ref}
    >
      {label}
      <input
        name={name}
        value={value}
        checked={checked}
        onChange={() => onChange(value)}
        disabled={disabled}
        type="radio"
        className="appearance-none"
      />
    </label>
  );
}

interface ToggleItemProps {
  name: string;
  label: string;
  checked: boolean;
  disabled: boolean;
  value: string;
  onChange: (value: string) => void;
}
