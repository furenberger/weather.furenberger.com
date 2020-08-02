import React from "react";
import { render } from "@testing-library/react";
import Panel from "../Panel";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Panel.test", () => {
  it("renders without crashing", () => {
    const container = render(<Panel />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it("renders empty card", () => {
    const { getByText } = render(<Panel />);
    expect(getByText("Please select a state")).toBeInTheDocument();
  });

  it("renders state card", () => {
    const selectedState = {
      stateName: "Wisconsin",
      id: "55",
      stateFlagUrl: 'http://flags.ox3.in/svg/us/wi.svg'
    };

    const { getByText } = render(<Panel selectedState={selectedState} />);
    expect(getByText("Wisconsin")).toBeInTheDocument();
  });
});
