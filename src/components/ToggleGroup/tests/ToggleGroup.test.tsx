import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ToggleGroup } from "../ToggleGroup";

describe("<ToggleGroup />", () => {
  test("updates checked on click", async () => {
    render(<MockToggleGroup />);

    const notChecked = screen.getAllByRole("radio", { checked: false })[0];
    await userEvent.click(notChecked);

    expect(notChecked).toBeChecked();
  });

  test("locks once all correct options have been selected", async () => {
    render(<MockToggleGroup />);

    const mockQuestionOptions = mockQuestions[0].questionOptions;
    for (const questionOption of mockQuestionOptions) {
      const correct = questionOption.options.find(
        (o) => o.value === questionOption.correct
      );
      if (!correct) {
        throw new Error(
          `The correct value for question option ${questionOption.id} is not listed as an option`
        );
      }

      const correctElement = screen.getByLabelText(correct.label);
      await userEvent.click(correctElement);
    }

    const allToggles = screen.getAllByRole("radio");
    for (const toggle of allToggles) {
      expect(toggle).toBeDisabled();
    }
  });

  test("can switch between active question", async () => {
    render(<MockToggleGroup />);

    const next = screen.getByText(/next question/i);
    await userEvent.click(next);

    expect(
      screen.queryByText("An animal cell contains:")
    ).not.toBeInTheDocument();
    expect(
      screen.getByText("Which of the following is a prime number?")
    ).toBeInTheDocument();
  });
});

const mockQuestions = [
  {
    id: "48c5fffa818be298",
    title: "An animal cell contains:",
    questionOptions: [
      {
        id: "73b5f49f9002a82a",
        correct: "hot",
        options: [
          {
            value: "hot",
            label: "Hot",
          },
          {
            value: "cold",
            label: "Cold",
          },
        ],
      },
      {
        id: "1fdf163d4ec2c598",
        correct: "option2",
        options: [
          {
            value: "option1",
            label: "Option 1",
          },
          {
            value: "option2",
            label: "Option 2",
          },
          {
            value: "option3",
            label: "Option 3",
          },
        ],
      },
      {
        id: "98d477d470d05368",
        correct: "impermeable",
        options: [
          {
            value: "partially",
            label: "Partially permeable membrane",
          },
          {
            value: "impermeable",
            label: "Impermeable membrane",
          },
        ],
      },
    ],
  },
  {
    id: "m2n3o4p5q6r7s8t9",
    title: "Which of the following is a prime number?",
    questionOptions: [
      {
        id: "n3o4p5q6r7s8t9u0",
        correct: "17",
        options: [
          {
            value: "16",
            label: "16",
          },
          {
            value: "17",
            label: "17",
          },
          {
            value: "18",
            label: "18",
          },
        ],
      },
    ],
  },
];

function MockToggleGroup() {
  return <ToggleGroup questions={mockQuestions} />;
}
