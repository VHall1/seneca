export type QuestionType = {
  id: string;
  correct: string;
  options: {
    value: string;
    label: string;
  }[];
};
