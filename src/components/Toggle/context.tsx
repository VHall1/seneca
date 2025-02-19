import { createContext, useContext } from "react";

type OptionsSet = Set<React.RefObject<HTMLLabelElement | null>>;

interface ToggleContextValue {
  value: string;
  onChange: (value: string) => void;
  disabled: boolean;
  isOverflowing: boolean;
  options: OptionsSet;
}

const ToggleContext = createContext<ToggleContextValue | undefined>(undefined);

interface ToggleProvider {
  children: React.ReactNode;
  value: ToggleContextValue["value"];
  onChange: ToggleContextValue["onChange"];
  disabled: ToggleContextValue["disabled"];
  isOverflowing: ToggleContextValue["isOverflowing"];
  options: ToggleContextValue["options"];
}

export function ToggleProvider({ children, ...value }: ToggleProvider) {
  return <ToggleContext value={value}>{children}</ToggleContext>;
}

export function useToggleContext() {
  const ctx = useContext(ToggleContext);

  if (!ctx) {
    throw new Error("useToggleContext hook must be wrapped by ToggleProvider");
  }

  return ctx;
}
