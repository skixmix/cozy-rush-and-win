import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import HomePage from "./HomePage";
import {
  checkCodeValidity,
  defaultErrorMessage,
} from "./functions/HomePage.functions";
import { StatusTypeEnum } from "./interfaces/HomePage.interfaces";

jest.mock("./functions/HomePage.functions", () => ({
  checkCodeValidity: jest.fn(),
}));

describe("HomePage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the form and handles input changes", () => {
    render(<HomePage />);

    const inputField = screen.getByRole("textbox");
    fireEvent.change(inputField, { target: { value: "ABCD1234" } });

    expect(inputField).toHaveValue("ABCD1234");
  });

  it("handles successful form submission", async () => {
    (checkCodeValidity as jest.Mock).mockResolvedValueOnce({
      status: StatusTypeEnum.ok,
      obtainedCode: "1234ABCD",
    });

    render(<HomePage />);

    const inputField = screen.getByRole("textbox");
    fireEvent.change(inputField, {
      target: { value: "ABCD1234" },
    });
    const submitButton = screen.getByRole("button");
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText(
          /WOW, that's a valid code! Here is your key: 1234ABCD/i
        )
      ).toBeInTheDocument();
    });
  });

  it("displays error message for invalid code", async () => {
    (checkCodeValidity as jest.Mock).mockResolvedValueOnce({
      status: StatusTypeEnum.error,
      errorMessage:
        "This code is not valid. If you want to obtain a valid code, make sure to ",
    });

    render(<HomePage />);

    const inputField = screen.getByRole("textbox");
    fireEvent.change(inputField, {
      target: { value: "INVALID" },
    });
    const submitButton = screen.getByRole("button");
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/YouTube/i)).toBeInTheDocument();
    });
  });

  it("resets form state on try again button click", async () => {
    (checkCodeValidity as jest.Mock).mockResolvedValueOnce({
      status: StatusTypeEnum.error,
      errorMessage:
        "Awww snap! The code was already used by someone else! Want new codes? ",
    });

    render(<HomePage />);

    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "USED" },
    });
    const submitButton = screen.getByRole("button");
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/YouTube/i)).toBeInTheDocument();
    });

    const retryButton = screen.getByRole("button");
    fireEvent.click(retryButton);

    await waitFor(() => {
      expect(screen.getByRole("textbox")).toHaveValue("");
    });
  });
});
