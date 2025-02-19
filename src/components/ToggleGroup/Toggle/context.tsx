import { createContext, useContext, useState } from "react";

interface ToggleOverflowingContextValue {
  isOverflowing: boolean;
  setIsOverflowing: (value: boolean) => void;
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

  return (
    <ToggleOverflowingContext value={{ isOverflowing, setIsOverflowing }}>
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
