import { useMemo, useState } from "react";
import { lerpColour, shuffleArray } from "../../utils";
import { COLOURS } from "./constants";
import { ToggleGroupProvider } from "./context";
import { Toggle, ToggleOverflowingProvider } from "./Toggle";
import { QuestionType } from "./types";

export function ToggleGroup({
  title,
  questions: rawQuestions,
  shuffleQuestions,
  shuffleAnswers,
}: ToggleGroupProps) {
  // Handles the shuffling of questions.
  // If the parent component re-renders for any reason it will cause this useMemo to
  // kick in and might end up re-shuffling questions.
  // Ideally, these would come shuffled from the API, rather than shuffling on the client.
  const questions = useMemo(() => {
    if (shuffleQuestions) {
      return shuffleArray(rawQuestions);
    }

    return rawQuestions;
  }, [rawQuestions, shuffleQuestions]);

  const [answers, setAnswers] = useState<{ [key: string]: string }>(() =>
    questions.reduce((accum, question) => {
      if (shuffleAnswers) {
        // avoid picking the correct answer when shuffling, otherwise
        // might have cases where the correct answers are already selected
        const first = shuffleArray(
          question.options.filter((option) => option.value !== question.correct)
        )[0];
        return { ...accum, [question.id]: first.value };
      }

      return { ...accum, [question.id]: question.options[0].value };
    }, {})
  );

  const handleOnChange = (questionId: string, value: string) => {
    setAnswers((answers) => ({
      ...answers,
      [questionId]: value,
    }));
  };

  const correctAnswers = questions.filter((q) => answers[q.id] === q.correct);
  const allCorrect = correctAnswers.length === questions.length;

  const calculateBackground = () => {
    if (allCorrect)
      return `linear-gradient(180deg, ${COLOURS.correct.gradient[0]} 0%, ${COLOURS.correct.gradient[1]} 100%)`;

    const percent = correctAnswers.length / questions.length;
    return `linear-gradient(180deg, ${lerpColour(
      COLOURS.incorrect.gradient[0],
      COLOURS.partial.gradient[0],
      percent
    )} 0%, ${lerpColour(
      COLOURS.incorrect.gradient[1],
      COLOURS.partial.gradient[1],
      percent
    )} 100%)`;
  };

  return (
    <ToggleGroupProvider
      answers={answers}
      setAnswers={setAnswers}
      questions={questions}
    >
      <div
        style={{ background: calculateBackground() }}
        className="h-full flex flex-col lg:justify-center px-4 pt-4 bg-linear-to-b"
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
    </ToggleGroupProvider>
  );
}

interface ToggleGroupProps {
  title: string;
  questions: QuestionType[];
  shuffleQuestions?: boolean;
  shuffleAnswers?: boolean;
}
