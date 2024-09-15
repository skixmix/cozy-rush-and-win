import { render, screen } from "@testing-library/react";
import Disclaimer from "./Disclaimer";

test("renders correctly", () => {
  render(<Disclaimer />);
  expect(screen.getByText("Disclaimer")).toBeInTheDocument();
});
