import React from 'react';
import { render } from '@testing-library/react';
import App from '../App';

// import MapGL, {Source, Layer} from 'react-map-gl';

beforeEach(()=>{
  jest.clearAllMocks()
})

// jest.mock('mapbox-gl/dist/mapbox-gl', () => ({
//   GeolocateControl: jest.fn(),
//   Map: jest.fn(() => ({
//     addControl: jest.fn(),
//     on: jest.fn(),
//     remove: jest.fn(),
//   })),
//   NavigationControl: jest.fn(),
// }));

it('renders without crashing', () => {
  const {getByText} = render(<App />);
  const title = getByText(/Weather/);
  expect(title).toBeInTheDocument();
})


