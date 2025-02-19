import { render, screen } from "@testing-library/react";
import useEvent from "@testing-library/user-event";
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
    await useEvent.click(notChecked);

    expect(notChecked).toBeChecked();
  });

  test("only one option can be checked at a time", async () => {
    render(<MockToggle />);

    const checked = screen.getByRole("radio", { checked: true });
    const notChecked = screen.getByRole("radio", { checked: false });
    await useEvent.click(notChecked);

    expect(checked).not.toBeChecked();
    expect(notChecked).toBeChecked();
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
        <ToggleItem name="test-toggle" label={opt.label} value={opt.value} />
      ))}
    </Toggle>
  );
}
