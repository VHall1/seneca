export type QuestionOptionType = {
  id: string;
  correct: string;
  options: {
    value: string;
    label: string;
  }[];
};

export type QuestionType = {
  id: string;
  title: string;
  questionOptions: QuestionOptionType[];
};

export type AllAnswersType = {
  [questionId: string]: AnswersType;
};

export type AnswersType = { [questionOptionId: string]: string };
