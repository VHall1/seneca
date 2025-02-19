export function QuestionGroup({ title, questions }: QuestionGroupProps) {
  return (
    <div>
      <span>{title}</span>
      {questions.map((q) => (
        <div role="radiogroup" key={q.id}>
          {q.options.map((option) => (
            <label key={option.value}>
              {option.label}
              <input name={q.id} value={option.value} type="radio" />
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
