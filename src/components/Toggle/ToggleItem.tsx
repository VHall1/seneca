import { useEffect, useRef } from "react";
import { cn } from "../../utils";
import { useToggleContext } from "./context";

export function ToggleItem({ label, value }: ToggleItemProps) {
  const {
    name,
    options,
    disabled,
    value: checkedValue,
    onChange,
  } = useToggleContext();

  const checked = value === checkedValue;

  const ref = useRef<HTMLLabelElement>(null);

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
          "text-[#9F938B]": checked,
          "cursor-pointer": !disabled,
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
  label: string;
  value: string;
}
