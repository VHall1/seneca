import { ToggleGroup } from "./components/ToggleGroup";

export function App() {
  return (
    <ToggleGroup
      title="An animal cell contains:"
      questions={mockQuestions}
      shuffleQuestions
    />
  );
}

// In a real-world scenario, these would be coming from an external API or something similar
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
];
