import React from "react";
import { render } from "@testing-library/react";
import Panel from "../Panel";

beforeEach(() => {
  jest.clearAllMocks();
});


describe("Panel.test", () => {
  it("renders without crashing", () => {
    const { getByText } = render(<Panel />);
    const title = getByText(/Selected State:/);
    expect(title).toBeInTheDocument();
  });


});
