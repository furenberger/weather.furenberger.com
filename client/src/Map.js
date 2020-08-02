import React, { useEffect, useState, useRef } from "react";
import bbox from "@turf/bbox";

import MapGL, {
  Source,
  Layer,
  FlyToInterpolator,
  WebMercatorViewport,
} from "react-map-gl";
import { json as requestJson } from "d3-request";

import "mapbox-gl/src/css/mapbox-gl.css";
import { stateBorders, stateFill } from "./map-styles";

//get this from the config (set in index.html from the node process)
const mapboxConfig = MAPBOX_CONFIG; // eslint-disable-line

// const STATE_DATA_URL = "https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_110m_admin_1_states_provinces_shp.geojson"
const STATE_DATA_URL = "/stateData";

const Map = ({selectedState, setSelectedState}) => {
  const [stateData, setStateData] = useState({});
  const [viewport, setViewport] = useState({
    latitude: 40,
    longitude: -100,
    zoom: 3,
    bearing: 0,
    pitch: 0,
  });
  const [hoveredState, setHoveredState] = useState({ stateName: "", id: "" });

  const _sourceRef = useRef(null);

  useEffect(() => {
    requestJson(STATE_DATA_URL, (error, response) => {
      if (!error) {
        setStateData(response);
      }
    });
  }, []);

  const _onViewportChange = (viewport) => setViewport(viewport);

  const updateMapFeatureStateHover = (map, id, hover) => {
    map.setFeatureState(
      {
        source: "states",
        id: id,
      },
      {
        hover,
      }
    );
  };

  const _onHover = (event) => {
    if (event && event.features) {
      //get a reference to the mapbox inside the component
      const mapboxSource = _sourceRef.current.getSource();

      // console.log("features");
      const feature = event.features.find((f) => f.layer.id === "state-fill");

      // if you are actually hovered over a state
      if (feature) {
        //clear the previous state
        updateMapFeatureStateHover(mapboxSource.map, hoveredState.id, false);

        // console.log(_sourceRef)
        // console.log('source: ', mapboxSource.map.__proto__)
        // console.log(_mapRef)
        // console.log(mapboxMapgl)
        updateMapFeatureStateHover(mapboxSource.map, feature.id, true);

        setHoveredState({
          stateName: feature.properties.STATE_NAME,
          id: feature.id,
        });
      } else {
        updateMapFeatureStateHover(mapboxSource.map, hoveredState.id, false);
      }
    }
  };

  const _onClick = (event) => {
    if (event && event.features) {
      const feature = event.features.find((f) => f.layer.id === "state-fill");

      // long/lat of click
      // console.log(event.lngLat);
      // const long = event.lngLat[0];
      // const lat = event.lngLat[1];
      // _goToViewport(long, lat);

      if (feature) {
        // look up cluster expansion zoom (properties inside the feature (state))
        _gotoBoundingBox(feature);
        setSelectedState({
          stateName: feature.properties.STATE_NAME,
          id: feature.id,
        });
      }
    }
  };

  const _gotoBoundingBox = (feature) => {
    // calculate the bounding box of the feature
    const [minLng, minLat, maxLng, maxLat] = bbox(feature);

    // construct a viewport instance from the current state
    const newViewPort = new WebMercatorViewport(viewport);
    const { longitude, latitude, zoom } = newViewPort.fitBounds(
      [
        [minLng, minLat],
        [maxLng, maxLat],
      ],
      {
        padding: 40,
      }
    );

    _onViewportChange({
      longitude,
      latitude,
      zoom,
      transitionInterpolator: new FlyToInterpolator({ speed: 2 }),
      transitionDuration: "auto",
    });
  };

  return (
    <div style={{ height: "100%", position: "relative" }}>
      <MapGL
        {...viewport}
        width="100%"
        height="100%"
        mapStyle="mapbox://styles/mapbox/light-v9"
        onViewportChange={_onViewportChange}
        mapboxApiAccessToken={mapboxConfig.mapboxToken}
        onClick={_onClick}
        onHover={_onHover}
      >
        {Object.keys(stateData).length > 0 ? (
          <Source type="geojson" data={stateData} id="states" ref={_sourceRef}>
            <Layer {...stateFill} />
            <Layer {...stateBorders} />
          </Source>
        ) : (
          ""
        )}
      </MapGL>
    </div>
  );
};

export default Map;
