import React, { useState } from "react";

import { AppBar, Typography, Toolbar, Grid } from "@material-ui/core";

import Map from "./Map";
import Panel from "./Panel";

import { getStateFlag, getWeather, isZipCode } from "../util";

const App = () => {
  const [selectedState, setSelectedState] = useState({});
  const [weather, setWeather] = useState({});
  const [zipCode, setZipCode] = useState("");

  const handleSetZipCode = async (event) => {
    const newZip = event.target.value;
    setZipCode(newZip);

    // TODO: Check if zip code is in state
    if (isZipCode(newZip)) {
      const weather = await getWeather(newZip);
      setWeather(weather);
    } else {
      setWeather({})
    }
  };

  const handleSetSelectedState = async (selectedState) => {
    const stateFlagUrl = await getStateFlag(selectedState.stateName);
    setSelectedState({
      ...selectedState,
      stateFlagUrl,
    });
  };

  return (
    <React.Fragment>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Weather</Typography>
        </Toolbar>
      </AppBar>
      <Grid container className="grid-main">
        <Grid item xs={6} className="grid-map">
          <Map
            selectedState={selectedState}
            setSelectedState={handleSetSelectedState}
          />
        </Grid>
        <Grid item xs={6} className="grid-panel">
          <Panel
            selectedState={selectedState}
            weather={weather}
            zipCode={zipCode}
            handleSetZipCode={handleSetZipCode}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default App;
