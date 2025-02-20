import { useMemo, useState } from "react";
import { shuffleArray } from "../../utils";
import { Toggle, ToggleIndicator, ToggleItem } from "../Toggle";
import { useCalculateColours } from "./hooks/useCalculateColours";
import { useCorrectAnswers } from "./hooks/useCorrectAnswers";
import { QuestionOptionType } from "./types";

export function ToggleGroup({
  title,
  questionOptions: rawQuestionOptions,
}: ToggleGroupProps) {
  const questionOptions = useMemo(
    () =>
      shuffleArray(
        rawQuestionOptions.map((questionOption) => ({
          ...questionOption,
          options: shuffleArray(questionOption.options),
        }))
      ),
    [rawQuestionOptions]
  );

  const [answers, setAnswers] = useState(() =>
    questionOptions.reduce<{ [key: string]: string }>(
      (accum, questionOption) => {
        // Avoid picking the correct answer when shuffling, otherwise
        // might have cases where the correct answers are already selected.
        const first = shuffleArray(
          questionOption.options.filter(
            (option) => option.value !== questionOption.correct
          )
        )[0];
        return { ...accum, [questionOption.id]: first.value };
      },
      {}
    )
  );

  const handleOnChange = (questionOptionId: string, value: string) => {
    setAnswers((answers) => ({
      ...answers,
      [questionOptionId]: value,
    }));
  };

  const { correctAnswers, allCorrect } = useCorrectAnswers(
    questionOptions,
    answers
  );
  const { backgroundGradient, indicatorColour, textColour } =
    useCalculateColours(
      allCorrect,
      correctAnswers.length,
      questionOptions.length
    );

  return (
    <div
      className="h-full flex flex-col lg:justify-center px-4 pt-4"
      style={{ background: backgroundGradient }}
    >
      <span className="text-white text-[20px]/[1.6] lg:text-[40px]/[1.4] font-bold text-center mb-8 lg:mb-10">
        {title}
      </span>

      <div className="flex flex-col gap-6">
        {questionOptions.map((questionOption) => (
          <Toggle
            name={questionOption.id}
            value={answers[questionOption.id]}
            onChange={(value) => handleOnChange(questionOption.id, value)}
            disabled={allCorrect}
            key={questionOption.id}
          >
            {questionOption.options.map((option) => (
              <ToggleItem
                value={option.value}
                style={{
                  color:
                    answers[questionOption.id] === option.value
                      ? textColour
                      : undefined,
                }}
                key={option.value}
              >
                {option.label}
              </ToggleItem>
            ))}

            <ToggleIndicator
              selectedIndex={questionOption.options.findIndex(
                (option) => option.value === answers[questionOption.id]
              )}
              totalLength={questionOption.options.length}
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
  questionOptions: QuestionOptionType[];
}
