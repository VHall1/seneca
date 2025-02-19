import { QuestionType } from "../types";

export function useCorrectAnswers(
  questions: QuestionType[],
  answers: { [key: string]: string }
) {
  const correctAnswers = questions.filter((q) => answers[q.id] === q.correct);
  const allCorrect = correctAnswers.length === questions.length;
  return { correctAnswers, allCorrect };
}
