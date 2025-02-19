import { useState } from "react";
import { ToggleGroupIndicator } from "./ToggleGroupIndicator";
import { QuestionType } from "./types";

export function ToggleGroup({ title, questions }: ToggleGroupProps) {
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});

  const handleOnChange = (questionId: string, value: string) => {
    setAnswers((answers) => ({
      ...answers,
      [questionId]: value,
    }));
  };

  const allCorrect = questions.every((q) => answers[q.id] === q.correct);

  return (
    <div className="flex flex-col px-4 pt-4 bg-red-400">
      <span className="text-center mb-8 lg:mb-10">{title}</span>

      <div className="flex flex-col gap-6">
        {questions.map((q) => (
          <div
            role="radiogroup"
            className="max-w-[900px] w-full mx-auto flex outline-1 relative"
            key={q.id}
          >
            {q.options.map((option) => (
              <label className="flex-1 text-center z-10" key={option.value}>
                {option.label}
                <input
                  name={q.id}
                  value={option.value}
                  checked={answers[q.id] === option.value}
                  onChange={() => handleOnChange(q.id, option.value)}
                  disabled={allCorrect}
                  type="radio"
                  className="appearance-none"
                />
              </label>
            ))}

            <ToggleGroupIndicator
              selectedIndex={q.options.findIndex(
                ({ value }) => value === answers[q.id]
              )}
              questionsTotal={q.options.length}
            />
          </div>
        ))}
      </div>

      <span className="text-center mt-8 lg:mt-13">
        The answer is {allCorrect ? "correct!" : "incorrect"}
      </span>
    </div>
  );
}

interface ToggleGroupProps {
  title: string;
  questions: QuestionType[];
}
