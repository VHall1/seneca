import { ToggleGroup } from "./components/ToggleGroup";

export function App() {
  return <ToggleGroup questions={mockQuestions} />;
}

// In a real-world scenario, this would be coming from an external API or something similar
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
    id: "b1a6d3c4e5f789ab",
    title: "What is the chemical formula for water?",
    questionOptions: [
      {
        id: "c2d3e4f5g6h7i8j9",
        correct: "H2O",
        options: [
          {
            value: "H2O",
            label: "H₂O",
          },
          {
            value: "CO2",
            label: "CO₂",
          },
          {
            value: "O2",
            label: "O₂",
          },
        ],
      },
    ],
  },
  {
    id: "f3g4h5i6j7k8l9m0",
    title: "Which planet is known as the Red Planet?",
    questionOptions: [
      {
        id: "a1b2c3d4e5f6g7h8",
        correct: "mars",
        options: [
          {
            value: "venus",
            label: "Venus",
          },
          {
            value: "mars",
            label: "Mars",
          },
          {
            value: "jupiter",
            label: "Jupiter",
          },
        ],
      },
    ],
  },
  {
    id: "h2i3j4k5l6m7n8o9",
    title: "Which gas do plants absorb during photosynthesis?",
    questionOptions: [
      {
        id: "i3j4k5l6m7n8o9p0",
        correct: "CO2",
        options: [
          {
            value: "O2",
            label: "Oxygen (O₂)",
          },
          {
            value: "CO2",
            label: "Carbon Dioxide (CO₂)",
          },
          {
            value: "N2",
            label: "Nitrogen (N₂)",
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
