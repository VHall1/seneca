import { createContext, useContext, useRef, useState } from "react";

type OptionsSet = Set<React.RefObject<HTMLLabelElement | null>>;

interface ToggleOverflowingContextValue {
  isOverflowing: boolean;
  setIsOverflowing: (value: boolean) => void;
  options: OptionsSet;
}

const ToggleOverflowingContext = createContext<
  ToggleOverflowingContextValue | undefined
>(undefined);

export function ToggleOverflowingProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOverflowing, setIsOverflowing] = useState(false);
  const options = useRef<OptionsSet>(new Set()).current;

  return (
    <ToggleOverflowingContext
      value={{ isOverflowing, setIsOverflowing, options }}
    >
      {children}
    </ToggleOverflowingContext>
  );
}

export function useToggleOverflowingContext() {
  const ctx = useContext(ToggleOverflowingContext);

  if (!ctx) {
    throw new Error(
      "useToggleOverflowingContext hook must be wrapped by ToggleOverflowingProvider"
    );
  }

  return ctx;
}
