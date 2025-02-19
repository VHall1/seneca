import { useState } from "react";
import { cn, shuffleArray } from "../../utils";
import { BG_GRADIENT } from "./constants";
import { Toggle, ToggleOverflowingProvider } from "./Toggle";
import { QuestionType } from "./types";

export function ToggleGroup({
  title,
  questions: rawQuestions,
  shuffleQuestions,
  shuffleAnswers,
}: ToggleGroupProps) {
  const [questions] = useState(() => {
    let questions = [...rawQuestions];

    if (shuffleQuestions) {
      questions = shuffleArray(rawQuestions);
    }

    if (shuffleAnswers) {
      questions = questions.map((q) => ({
        ...q,
        options: shuffleArray(q.options),
      }));
    }

    return questions;
  });

  const [answers, setAnswers] = useState<{ [key: string]: string }>(() =>
    questions.reduce(
      (accum, q) => ({ ...accum, [q.id]: q.options[0].value }),
      {}
    )
  );

  const handleOnChange = (questionId: string, value: string) => {
    setAnswers((answers) => ({
      ...answers,
      [questionId]: value,
    }));
  };

  const correctAnswers = questions.filter((q) => answers[q.id] === q.correct);
  const allCorrect = correctAnswers.length === Object.keys(answers).length;
  const partialCorrect = !allCorrect && correctAnswers.length >= 1;

  return (
    <div
      className={cn(
        "h-full flex flex-col lg:justify-center px-4 pt-4 bg-linear-to-b",
        {
          [`from-[${BG_GRADIENT.incorrect[0]}] to-[${BG_GRADIENT.incorrect[1]}]`]:
            true,
          [`from-[${BG_GRADIENT.partial[0]}] to-[${BG_GRADIENT.partial[1]}]`]:
            partialCorrect,
          [`from-[${BG_GRADIENT.correct[0]}] to-[${BG_GRADIENT.correct[1]}]`]:
            allCorrect,
        }
      )}
    >
      <span className="text-white text-[20px]/[1.6] lg:text-[40px]/[1.4] font-bold text-center mb-8 lg:mb-10">
        {title}
      </span>

      <div className="flex flex-col gap-6">
        {questions.map((q) => (
          <ToggleOverflowingProvider key={q.id}>
            <Toggle
              question={q}
              disabled={allCorrect}
              value={answers[q.id]}
              onChange={(value) => handleOnChange(q.id, value)}
            />
          </ToggleOverflowingProvider>
        ))}
      </div>

      <span className="text-white text-[16px]/[1.6] lg:text-[32px]/[1.4] font-bold text-center mt-8 lg:mt-13">
        The answer is {allCorrect ? "correct!" : "incorrect"}
      </span>
    </div>
  );
}

interface ToggleGroupProps {
  title: string;
  questions: QuestionType[];
  shuffleQuestions?: boolean;
  shuffleAnswers?: boolean;
}
