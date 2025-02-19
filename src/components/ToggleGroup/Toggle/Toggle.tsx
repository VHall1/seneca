import { cn } from "../../../utils/cn";
import { QuestionType } from "../types";
import { useToggleOverflowingContext } from "./context";
import { ToggleGroupIndicator } from "./ToggleGroupIndicator";
import { ToggleItem } from "./ToggleItem";

export function Toggle({ question, disabled, value, onChange }: ToggleProps) {
  const { isOverflowing } = useToggleOverflowingContext();

  return (
    <div
      role="radiogroup"
      className={cn(
        "max-w-[900px] overflow-hidden w-full mx-auto flex outline-2 -outline-offset-2 outline-white rounded-full relative",
        {
          "flex-col rounded-3xl": isOverflowing,
        }
      )}
    >
      {question.options.map((option) => (
        <ToggleItem
          name={question.id}
          label={option.label}
          checked={value === option.value}
          disabled={disabled}
          value={option.value}
          onChange={onChange}
          key={option.value}
        />
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
