import { Toggle, ToggleIndicator, ToggleItem } from "../Toggle";
import { useCalculateColours } from "./hooks/useCalculateColours";
import { useCorrectAnswers } from "./hooks/useCorrectAnswers";
import { AnswersType, QuestionType } from "./types";

export function ToggleGroupItem({
  children,
  question,
  answers,
  onChange,
}: ToggleGroupItemProps) {
  const questionOptions = question.questionOptions;
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
        {question.title}
      </span>

      <div className="flex flex-col gap-6">
        {questionOptions.map((questionOption) => (
          <Toggle
            name={questionOption.id}
            value={answers[questionOption.id]}
            onChange={(value) =>
              onChange(question.id, questionOption.id, value)
            }
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

      {children}
    </div>
  );
}

interface ToggleGroupItemProps {
  children: React.ReactNode;
  question: QuestionType;
  answers: AnswersType;
  onChange: (
    questionId: string,
    questionOptionId: string,
    value: string
  ) => void;
}
