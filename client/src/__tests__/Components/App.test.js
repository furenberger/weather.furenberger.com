import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import App from "../../Components/App";

import MapGL, {  Source,
  Layer,
  FlyToInterpolator,
  WebMercatorViewport
} from 'react-map-gl'

beforeEach(() => {
  jest.clearAllMocks();
});


describe("App.test", () => {
  it("snapshot renders", () => {
    const container = render(<App />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
