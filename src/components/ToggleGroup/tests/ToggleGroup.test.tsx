import { render, screen } from "@testing-library/react";
import { ToggleGroup } from "../ToggleGroup";

describe("<ToggleGroup />", () => {
  test("loads and displays all options", async () => {
    render(<MockToggleGroup />);

    await Promise.all(
      mockQuestions[0].options.map(async ({ label }) => {
        const input = await screen.findByLabelText(label);
        expect(input).toBeInTheDocument();
      })
    );
  });
});

const mockQuestions = [
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
];

function MockToggleGroup() {
  return (
    <ToggleGroup title="An animal cell contains:" questions={mockQuestions} />
  );
}
