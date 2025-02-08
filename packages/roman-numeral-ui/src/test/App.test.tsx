import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import App from "../App";
import { getRomanNumeral } from "../romanNumeral";
import { defaultTheme, Provider } from "@adobe/react-spectrum";

// Mock getRomanNumeral
jest.mock("../romanNumeral", () => ({
  getRomanNumeral: jest.fn(),
}));

describe("Roman Numeral Converter App", () => {
  test("renders the app correctly", async () => {
    render(<App />);

    expect(screen.getByText(/Roman Numeral Converter/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Enter a number/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Convert to Roman Numeral/i })).toBeEnabled();
  });

  test("shows an error for invalid input", () => {
    render(<App />);
    
    const input = screen.getByLabelText(/Enter a number/i);
    fireEvent.change(input, { target: { value: "abc" } });

    expect(screen.getByText("Value is not an integer :(")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Convert to Roman Numeral/i })).toBeDisabled();
  });

  test("shows an error when input is out of range", () => {
    render(<App />);
    
    const input = screen.getByLabelText(/Enter a number/i);
    fireEvent.change(input, { target: { value: "5000" } });

    expect(screen.getByText("Value must be between 1 and 3999")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Convert to Roman Numeral/i })).toBeDisabled();
  });

  test("enables the button for valid input", () => {
    render(<App />);
    
    const input = screen.getByLabelText(/Enter a number/i);
    fireEvent.change(input, { target: { value: "10" } });

    expect(screen.queryByText("Value must be between 1 and 3999")).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Convert to Roman Numeral/i })).toBeEnabled();
  });

  test("calls getRomanNumeral and displays result", async () => {
    (getRomanNumeral as jest.Mock).mockResolvedValue("X");

    render(<App />);
    
    const input = screen.getByLabelText(/Enter a number/i);
    fireEvent.change(input, { target: { value: "10" } });

    const button = screen.getByRole("button", { name: /Convert to Roman Numeral/i });
    fireEvent.click(button);

    await waitFor(() => expect(getRomanNumeral).toHaveBeenCalledWith(10));
    expect(await screen.findByText(/Roman numeral: X/i)).toBeInTheDocument();
  });
});

