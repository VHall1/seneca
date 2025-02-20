import { useMemo, useState } from "react";
import { shuffleArray } from "../../utils";
import { Toggle, ToggleIndicator, ToggleItem } from "../Toggle";
import { useCalculateColours } from "./hooks/useCalculateColours";
import { useCorrectAnswers } from "./hooks/useCorrectAnswers";
import { QuestionType } from "./types";

export function ToggleGroup({
  title,
  questions: rawQuestions,
}: ToggleGroupProps) {
  // Ideally, these would come shuffled from the API, rather than shuffling on the client.
  const questions = useMemo(
    () =>
      shuffleArray(
        rawQuestions.map((q) => ({ ...q, options: shuffleArray(q.options) }))
      ),
    [rawQuestions]
  );

  const [answers, setAnswers] = useState(() =>
    questions.reduce<{ [key: string]: string }>((accum, question) => {
      // Avoid picking the correct answer when shuffling, otherwise
      // might have cases where the correct answers are already selected.
      const first = shuffleArray(
        question.options.filter((option) => option.value !== question.correct)
      )[0];
      return { ...accum, [question.id]: first.value };
    }, {})
  );

  const handleOnChange = (questionId: string, value: string) => {
    setAnswers((answers) => ({
      ...answers,
      [questionId]: value,
    }));
  };

  const { correctAnswers, allCorrect } = useCorrectAnswers(questions, answers);
  const { backgroundGradient, indicatorColour, textColour } =
    useCalculateColours(allCorrect, correctAnswers.length, questions.length);

  return (
    <div
      className="h-full flex flex-col lg:justify-center px-4 pt-4"
      style={{ background: backgroundGradient }}
    >
      <span className="text-white text-[20px]/[1.6] lg:text-[40px]/[1.4] font-bold text-center mb-8 lg:mb-10">
        {title}
      </span>

      <div className="flex flex-col gap-6">
        {questions.map((q) => (
          <Toggle
            name={q.id}
            value={answers[q.id]}
            onChange={(value) => handleOnChange(q.id, value)}
            disabled={allCorrect}
            key={q.id}
          >
            {q.options.map((option) => (
              <ToggleItem
                value={option.value}
                style={{
                  color:
                    answers[q.id] === option.value ? textColour : undefined,
                }}
                key={option.value}
              >
                {option.label}
              </ToggleItem>
            ))}

            <ToggleIndicator
              selectedIndex={q.options.findIndex(
                (option) => option.value === answers[q.id]
              )}
              questionsTotal={q.options.length}
              className="h-full flex flex-col lg:justify-center px-4 pt-4"
              style={{
                backgroundColor: indicatorColour,
              }}
            />
          </Toggle>
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
}
