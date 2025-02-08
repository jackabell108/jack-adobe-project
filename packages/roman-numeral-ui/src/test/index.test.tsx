import React from "react";
import ReactDOM from "react-dom/client";
import App from "../App";

jest.mock("react-dom/client", () => ({
  createRoot: jest.fn().mockReturnValue({
    render: jest.fn(),
  }),
}));

describe("index.tsx", () => {
  it("renders the App component without crashing", () => {
    const mockCreateRoot = ReactDOM.createRoot as jest.Mock;
    const mockRender = jest.fn();

    mockCreateRoot.mockReturnValue({ render: mockRender });

    document.body.innerHTML = '<div id="root"></div>';

    require("../index");

    expect(mockCreateRoot).toHaveBeenCalledWith(document.getElementById("root"));
    expect(mockRender).toHaveBeenCalled();
  });
});

