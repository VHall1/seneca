import { useState } from "react";
import { Toggle } from "./Toggle";
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
      <span className="text-white text-[20px]/[1.6] lg:text-[40px]/[1.4] font-bold text-center mb-8 lg:mb-10">
        {title}
      </span>

      <div className="flex flex-col gap-6">
        {questions.map((q) => (
          <Toggle
            question={q}
            disabled={allCorrect}
            value={answers[q.id]}
            onChange={(value) => handleOnChange(q.id, value)}
            key={q.id}
          />
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
