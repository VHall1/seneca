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
  const { options } = useToggleOverflowingContext();

  useEffect(() => {
    options.add(ref);
    return () => {
      options.delete(ref);
    };
  });

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
