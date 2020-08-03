import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Panel from "../../Components/Panel";

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
      stateFlagUrl: "http://flags.ox3.in/svg/us/wi.svg",
    };

    const { getByText } = render(<Panel selectedState={selectedState} />);
    expect(getByText("Wisconsin")).toBeInTheDocument();
  });

  it("zipcode", () => {
    const selectedState = {
      stateName: "Wisconsin",
      id: "55",
      stateFlagUrl: "http://flags.ox3.in/svg/us/wi.svg",
    };

    const zip = 12;

    const { getByTestId } = render(
      <Panel selectedState={selectedState} zipCode={zip} />
    );
    const zipcodeInput = getByTestId("zipcode");
    expect(zipcodeInput).toHaveValue(zip);
  });

  it("zipcode change", async () => {
    const selectedState = {
      stateName: "Wisconsin",
      id: "55",
      stateFlagUrl: "http://flags.ox3.in/svg/us/wi.svg",
    };

    const zipCode = 12;

    const props = {
      selectedState,
      zipCode,
      handleSetZipCode: jest.fn(),
    };

    const { getByTestId } = render(<Panel {...props} />);
    const zipcodeInput = getByTestId("zipcode");
    expect(zipcodeInput).toHaveValue(zipCode);

    fireEvent.change(zipcodeInput, { target: { value: "123" } });
    expect(props.handleSetZipCode).toHaveBeenCalledTimes(1);
  });

  it("weather", async () => {
    const selectedState = {
      stateName: "Wisconsin",
      id: "55",
      stateFlagUrl: "http://flags.ox3.in/svg/us/wi.svg",
    };

    const weather = {
      city: "city",
      temperature: "9",
      icon: `http://openweathermap.org/img/wn/04d@2x.png`,
      iconName: "clouds",
      description: "desc",
      details: [
        {
          value: "1000000",
          label: "High Temperature",
        },
      ],
    };

    const zipCode = 12;

    const props = {
      selectedState,
      zipCode,
      weather,
    };

    const { getByText } = render(<Panel {...props} />);
    expect(getByText("Weather for city")).toBeInTheDocument();
  });
});
