import React from "react";
import { render, screen, queryByAttribute } from "@testing-library/react";
import App from "./App";

const getByName = queryByAttribute.bind(null, "id");

test("Renders the test log in page and looks for the title", () => {
    render(<App />);
    expect(screen.getByText(/Log in to Zip.It/i)).toBeInTheDocument();
});

test("Renders the test log in page and looks for email field", () => {
    const dom = render(<App />);
    expect(getByName(dom.container, "email")).toBeInTheDocument();
});

test("Renders the test log in page and looks for the password field", () => {
    const dom = render(<App />);
    expect(getByName(dom.container, "password")).toBeInTheDocument();
});

test("Renders the test log in page and looks for the login button", () => {
    const dom = render(<App />);
    expect(getByName(dom.container, "login")).toBeInTheDocument();
});

test("Renders the test log in page and looks for the colour mode button", () => {
    const dom = render(<App />);
    expect(getByName(dom.container, "color_mode")).toBeInTheDocument();
});
