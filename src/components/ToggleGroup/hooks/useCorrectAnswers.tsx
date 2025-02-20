import { QuestionOptionType } from "../types";

export function useCorrectAnswers(
  questionOptions: QuestionOptionType[],
  answers: { [key: string]: string }
) {
  const correctAnswers = questionOptions.filter(
    (questionOption) => answers[questionOption.id] === questionOption.correct
  );
  const allCorrect = correctAnswers.length === questionOptions.length;
  return { correctAnswers, allCorrect };
}
