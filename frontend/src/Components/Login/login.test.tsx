import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import Login from "./Login";
import { MemoryRouter, useNavigate } from "react-router-dom";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(), // Mock useNavigate to return a function
}));

describe("Login component", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders login form", () => {
    const { getByLabelText, getByRole } = render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );
    expect(getByLabelText("Username")).toBeInTheDocument();
    expect(getByLabelText("Password")).toBeInTheDocument();
    expect(getByRole("button", { name: "Login" })).toBeInTheDocument();
  });

  test("redirects to home page upon successful login", async () => {
    // Mocking the fetch function to resolve with a successful response
    global.fetch = jest.fn().mockResolvedValue({ ok: true });

    const navigate = jest.fn();
    (useNavigate as jest.Mock).mockReturnValue(navigate);

    const { getByLabelText, getByRole } = render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    fireEvent.change(getByLabelText("Username"), {
      target: { value: "validusername" },
    });
    fireEvent.change(getByLabelText("Password"), {
      target: { value: "validpassword" },
    });
    fireEvent.click(getByRole("button", { name: "Login" }));

    await waitFor(() => {
      // Assert that navigate was called with the expected URL
      expect(navigate).toHaveBeenCalledWith("/home");
    });
  });
});
