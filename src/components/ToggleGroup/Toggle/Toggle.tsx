import { useEffect, useRef } from "react";
import { cn } from "../../../utils";
import { useToggleOverflowingContext } from "./context";

export function Toggle({ children, className, ...props }: ToggleProps) {
  const { isOverflowing, setIsOverflowing, options } =
    useToggleOverflowingContext();
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
  );
}

type ToggleProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;
