import { useState } from "react";

export function QuestionGroup({ title, questions }: QuestionGroupProps) {
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});

  const handleOnChange = (questionId: string, value: string) => {
    setAnswers((answers) => ({
      ...answers,
      [questionId]: value,
    }));
  };

  return (
    <div>
      <span>{title}</span>
      {questions.map((q) => (
        <div role="radiogroup" key={q.id}>
          {q.options.map((option) => (
            <label key={option.value}>
              {option.label}
              <input
                name={q.id}
                value={option.value}
                checked={answers[q.id] === option.value}
                onChange={() => handleOnChange(q.id, option.value)}
                type="radio"
              />
            </label>
          ))}
        </div>
      ))}
    </div>
  );
}

interface QuestionGroupProps {
  title: string;
  questions: {
    id: string;
    correct: string;
    options: {
      value: string;
      label: string;
    }[];
  }[];
}
