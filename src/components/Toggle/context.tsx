import { createContext, useContext } from "react";

type OptionsSet = Set<React.RefObject<HTMLLabelElement | null>>;

interface ToggleOverflowingContextValue {
  isOverflowing: boolean;
  options: OptionsSet;
}

const ToggleOverflowingContext = createContext<
  ToggleOverflowingContextValue | undefined
>(undefined);

interface ToggleOverflowingProvider {
  children: React.ReactNode;
  isOverflowing: ToggleOverflowingContextValue["isOverflowing"];
  options: ToggleOverflowingContextValue["options"];
}

export function ToggleOverflowingProvider({
  children,
  ...value
}: ToggleOverflowingProvider) {
  return (
    <ToggleOverflowingContext value={value}>
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
