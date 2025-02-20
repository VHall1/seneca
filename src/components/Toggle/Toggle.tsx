import { useEffect, useId, useRef, useState } from "react";
import { cn } from "../../utils";
import { ToggleProvider } from "./context";
import { OptionsSet } from "./types";

export function Toggle({
  children,
  className,
  name,
  disabled,
  defaultValue,
  value: propValue,
  onChange: propOnChange,
  ...props
}: ToggleProps) {
  const generatedName = useId();

  const [internalValue, internalSetValue] = useState<string>(
    defaultValue ?? ""
  );
  const value = propValue ?? internalValue;
  const onChange = propOnChange ?? internalSetValue;

  // these are used to determine if the text is overflowing or not,
  // which is used to switch between horizontal and vertical mode.
  const [isOverflowing, setIsOverflowing] = useState(false);
  const options = useRef<OptionsSet>(new Set()).current;
  const windowSizeRef = useRef(-1);

  useEffect(() => {
    const checkOverflow = () => {
      const windowWidth = window.innerWidth;
      const overflowing = Array.from(options).some((ref) => {
        // return "not overflowing" if element hasn't been rendered yet
        if (!ref.current) return false;
        return ref.current.scrollWidth > ref.current.clientWidth;
      });

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
    <ToggleProvider
      name={name ?? generatedName}
      disabled={disabled ?? false}
      value={value}
      onChange={onChange}
      isOverflowing={isOverflowing}
      options={options}
    >
      <div
        role="radiogroup"
        className={cn(
          "max-w-[900px] overflow-hidden w-full mx-auto flex outline-2 -outline-offset-2 outline-white rounded-full relative",
          {
            "flex-col rounded-3xl": isOverflowing,
          },
          className
        )}
        {...props}
      >
        {children}
      </div>
    </ToggleProvider>
  );
}

interface ToggleProps
  extends Omit<
    React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLDivElement>,
      HTMLDivElement
    >,
    "onChange"
  > {
  name?: string;
  disabled?: boolean;
  defaultValue?: string;
  value?: string;
  onChange?: (value: string) => void;
}
