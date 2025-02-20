import { useMemo, useState } from "react";
import { getNext, getPrev, shuffleArray } from "../../utils";
import { Button } from "../Button";
import { ToggleGroupItem } from "./ToggleGroupItem";
import { AllAnswersType, QuestionType } from "./types";

export function ToggleGroup({ questions: rawQuestions }: ToggleGroupProps) {
  const questions = useMemo(
    () =>
      rawQuestions.map((q) => ({
        ...q,
        questionOptions: shuffleArray(
          q.questionOptions.map((questionOption) => ({
            ...questionOption,
            options: shuffleArray(questionOption.options),
          }))
        ),
      })),
    [rawQuestions]
  );
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const activeQuestion = questions[activeQuestionIndex];

  const [allAnswers, setAllAnswers] = useState<AllAnswersType>(() =>
    questions.reduce((accum, question) => {
      const opt = question.questionOptions.reduce((accum, questionOption) => {
        // Avoid picking the correct answer when shuffling, otherwise
        // might have cases where the correct answers are already selected.
        const first = shuffleArray(
          questionOption.options.filter(
            (option) => option.value !== questionOption.correct
          )
        )[0];
        return { ...accum, [questionOption.id]: first.value };
      }, {});
      return { ...accum, [question.id]: opt };
    }, {})
  );

  const handleOnChange = (
    questionId: string,
    questionOptionId: string,
    value: string
  ) => {
    setAllAnswers((allAnswers) => ({
      ...allAnswers,
      [questionId]: {
        ...allAnswers[questionId],
        [questionOptionId]: value,
      },
    }));
  };

  return (
    <ToggleGroupItem
      question={activeQuestion}
      answers={allAnswers[activeQuestion.id]}
      onChange={handleOnChange}
    >
      <div className="flex">
        <Button
          onClick={() =>
            setActiveQuestionIndex(getPrev(questions, activeQuestionIndex))
          }
        >
          prev q
        </Button>
        <Button
          onClick={() =>
            setActiveQuestionIndex(getNext(questions, activeQuestionIndex))
          }
        >
          next q
        </Button>
      </div>
    </ToggleGroupItem>
  );
}

interface ToggleGroupProps {
  questions: QuestionType[];
}
