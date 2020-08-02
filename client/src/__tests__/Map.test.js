import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Map from "../Map";

import MapGL, {  Source,
  Layer,
  FlyToInterpolator,
  WebMercatorViewport
} from 'react-map-gl'

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Map.test", () => {
  it("snapshot renders", () => {
    const container = render(<Map />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
