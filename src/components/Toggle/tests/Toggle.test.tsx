import { render, screen } from "@testing-library/react";
import { useState } from "react";
import { Toggle } from "../Toggle";
import { ToggleItem } from "../ToggleItem";

describe("<Toggle />", () => {
  test("loads and displays all options", async () => {
    render(<MockToggle />);

    await Promise.all(
      mockOptions.map(async ({ label }) => {
        const input = await screen.findByLabelText(label);
        expect(input).toBeInTheDocument();
      })
    );
  });
});

const mockOptions = [
  {
    value: "hot",
    label: "Hot",
  },
  {
    value: "cold",
    label: "Cold",
  },
];

function MockToggle() {
  const [value, setValue] = useState("hot");

  return (
    <Toggle>
      {mockOptions.map((opt) => (
        <ToggleItem
          name="test-toggle"
          label={opt.label}
          value={opt.value}
          checked={value === opt.value}
          onChange={setValue}
        />
      ))}
    </Toggle>
  );
}
