import React from "react";
import { render } from "@testing-library/react";
import Map from "../../Components/Map";

// import MapGL, {  Source,
//   Layer,
//   FlyToInterpolator,
//   WebMercatorViewport
// } from 'react-map-gl'

describe("Map.test", () => {
  it("snapshot renders", () => {
    const setSelectedState = jest.fn()
    const selectedState = {
      stateName: 'Wisconsin',
      id: '55'
    }
    const container = render(<Map selectedState={selectedState} setSelectedState={setSelectedState} />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
