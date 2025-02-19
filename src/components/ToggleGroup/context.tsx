import { createContext, useContext } from "react";
import { QuestionType } from "./types";

interface ToggleGroupContextValue {
  answers: { [key: string]: string };
  setAnswers: React.Dispatch<
    React.SetStateAction<{
      [key: string]: string;
    }>
  >;
  questions: QuestionType[];
}

const ToggleGroupContext = createContext<ToggleGroupContextValue | undefined>(
  undefined
);

interface ToggleGroupProviderProps {
  children: React.ReactNode;
  answers: ToggleGroupContextValue["answers"];
  setAnswers: ToggleGroupContextValue["setAnswers"];
  questions: ToggleGroupContextValue["questions"];
}

export function ToggleGroupProvider({
  children,
  answers,
  setAnswers,
  questions,
}: ToggleGroupProviderProps) {
  return (
    <ToggleGroupContext value={{ answers, setAnswers, questions }}>
      {children}
    </ToggleGroupContext>
  );
}

export function useToggleGroupContext() {
  const ctx = useContext(ToggleGroupContext);

  if (!ctx) {
    throw new Error(
      "useToggleGroupContext hook must be wrapped by ToggleGroupProvider"
    );
  }

  return ctx;
}
