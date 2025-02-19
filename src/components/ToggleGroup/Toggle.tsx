import { ToggleGroupIndicator } from "./ToggleGroupIndicator";
import { QuestionType } from "./types";

export function Toggle({ question, disabled, value, onChange }: ToggleProps) {
  return (
    <div
      role="radiogroup"
      className="max-w-[900px] w-full mx-auto flex outline-2 -outline-offset-2 outline-white rounded-full relative"
    >
      {question.options.map((option) => (
        <label
          className="flex-1 text-center py-2.5 lg:py-5 z-10"
          key={option.value}
        >
          {option.label}
          <input
            name={question.id}
            value={option.value}
            checked={value === option.value}
            onChange={() => onChange(option.value)}
            disabled={disabled}
            type="radio"
            className="appearance-none"
          />
        </label>
      ))}

      <ToggleGroupIndicator
        selectedIndex={question.options.findIndex(
          (option) => option.value === value
        )}
        questionsTotal={question.options.length}
      />
    </div>
  );
}

interface ToggleProps {
  question: QuestionType;
  disabled: boolean;

  value: string;
  onChange: (value: string) => void;
}
