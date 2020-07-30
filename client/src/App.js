import React, { useEffect, useState } from "react";
import "mapbox-gl/src/css/mapbox-gl.css";

import MapGL, { Source, Layer } from "react-map-gl";
import { json as requestJson } from "d3-request";

import {AppBar, Typography, Toolbar} from "@material-ui/core";

//get this from the config (set in index.html from the node process)
const mapboxConfig = MAPBOX_CONFIG; // eslint-disable-line

const stateLayer = {
  id: "stateLayer",
  type: "fill",
  paint: {
    "fill-opacity": 0,
  },
};

// const STATE_DATA_URL = "https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_110m_admin_1_states_provinces_shp.geojson"
const STATE_DATA_URL = "/stateData"

const App = () => {
  const [stateData, setStateData] = useState({});
  const [viewport, setViewport] = useState({
    latitude: 40,
    longitude: -100,
    zoom: 3,
    bearing: 0,
    pitch: 0,
  });

  useEffect(() => {
    console.log('get state data')
    requestJson(
      STATE_DATA_URL,
      (error, response) => {
        if (!error) {
          console.log('setting state data')
          setStateData(response);
        }
      }
    );
  },[]);

  const _onViewportChange = (viewport) => setViewport(viewport);

  const _onClick = (event) => {
    // feature (state)
    const feature = event.features.find((f) => f.layer.id === "stateLayer");

    // long/lat of click
    // console.log(event.lngLat);
    // const long = event.lngLat[0];
    // const lat = event.lngLat[1];

    if (feature) {
      // look up cluster expansion zoom (properties inside the feature (state))
      console.log(feature.properties);
    }
  };

  return (
    <React.Fragment>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">
            Weather
          </Typography>
        </Toolbar>
      </AppBar>
      <div style={{ height: "100%", position: "relative" }}>
        <MapGL
          {...viewport}
          width="100%"
          height="100%"
          mapStyle="mapbox://styles/mapbox/light-v9"
          onViewportChange={_onViewportChange}
          mapboxApiAccessToken={mapboxConfig.mapboxToken}
          onClick={_onClick}
        >
          {Object.keys(stateData).length > 0 ? (
            <Source type="geojson" data={stateData}>
              <Layer {...stateLayer} />
            </Source>
          ) : (
            ""
          )}
        </MapGL>
      </div>
    </React.Fragment>
  );
};

export default App;
