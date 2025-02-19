import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
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

  test("updates checked on click", async () => {
    render(<MockToggle />);

    const notChecked = screen.getByRole("radio", { checked: false });
    await userEvent.click(notChecked);

    expect(notChecked).toBeChecked();
  });

  test("works when state is manually controlled", async () => {
    render(<ControlledMockToggle />);

    const notChecked = screen.getByRole("radio", { checked: false });
    await userEvent.click(notChecked);

    expect(notChecked).toBeChecked();
  });

  test("only one option can be checked at a time", async () => {
    render(<MockToggle />);

    const checked = screen.getByRole("radio", { checked: true });
    const notChecked = screen.getByRole("radio", { checked: false });
    await userEvent.click(notChecked);

    expect(checked).not.toBeChecked();
    expect(notChecked).toBeChecked();
  });

  test("assigns a random name if one isn't provided", async () => {
    render(
      <Toggle defaultValue="hot">
        {mockOptions.map((opt) => (
          <ToggleItem value={opt.value} key={opt.value}>
            {opt.label}
          </ToggleItem>
        ))}
      </Toggle>
    );

    const allToggles = screen.getAllByRole("radio");
    for (const toggle of allToggles) {
      expect(toggle).toHaveAttribute("name");
    }
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
  return (
    <Toggle defaultValue="hot">
      {mockOptions.map((opt) => (
        <ToggleItem value={opt.value} key={opt.value}>
          {opt.label}
        </ToggleItem>
      ))}
    </Toggle>
  );
}

function ControlledMockToggle() {
  const [value, setValue] = useState("hot");

  return (
    <Toggle value={value} onChange={setValue}>
      {mockOptions.map((opt) => (
        <ToggleItem value={opt.value} key={opt.value}>
          {opt.label}
        </ToggleItem>
      ))}
    </Toggle>
  );
}
