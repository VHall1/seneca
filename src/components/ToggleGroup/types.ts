export type QuestionOptionType = {
  id: string;
  correct: string;
  options: {
    value: string;
    label: string;
  }[];
};
