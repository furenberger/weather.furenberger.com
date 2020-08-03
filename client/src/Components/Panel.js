import React from "react";
import {
  Container,
  Card,
  CardMedia,
  CardContent,
  Input,
  InputLabel,
  Typography,
  Table,
  TableRow,
  TableCell,
  TableBody,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  card: {
    padding: 15,
    marginTop: 24,
    marginBottom: 24,
    minWidth: 275,
  },
  media: {
    height: 0,
    margin: 15,
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
    paddingTop: "56.25%", // 16:9
  },
  stateName: {
    marginBottom: 5,
  },
  stateContainer: {
    paddingLeft: 15,
    marginLeft: 15,
    display: "flex",
    maxWidth: "100%",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  left:{
     width: "50%", minHeight: 120
  },
  right:{

  }
}));

const Panel = (props) => {
  const { selectedState, weather = {}, handleSetZipCode, zipCode } = props;
  const classes = useStyles();

  const renderStateCard = (selectedState) => {
    return (
      <div>
        <Card className={classes.card}>
          <CardMedia
            className={classes.media}
            image={selectedState.stateFlagUrl}
            title={selectedState.stateName + " state flag"}
          />
          <CardContent>
            <div className={classes.stateContainer}>
              <div className={classes.left}>
                <Typography
                  variant="h4"
                  component="h4"
                  className={classes.stateName}
                >
                  {selectedState.stateName}
                </Typography>
                <InputLabel htmlFor="zipcode">
                  Please enter a Zip Code
                </InputLabel>
                <Input
                  type="number"
                  id="zipcode"
                  inputProps={{
                    'data-testid': 'zipcode'
                  }}
                  required
                  label="Zip Code"
                  value={zipCode}
                  onChange={handleSetZipCode}
                />
              </div>
              {Object.entries(weather).length === 0 ? null : (
                <div className={classes.right}>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    Weather for {weather.city}
                  </Typography>
                  <div style={{ display: "inline-flex" }}>
                    <h2 style={{ alignSelf: "center" }}>
                      {weather.temperature}
                    </h2>
                    <div style={{ alignSelf: "center" }}>
                      <img src={weather.icon} alt={weather.iconName} />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </CardContent>

          {Object.entries(weather).length === 0 ? null : renderWeather(weather)}
        </Card>
      </div>
    );
  };

  const renderEmptyCard = () => {
    return (
      <Card className={classes.card}>
        <Typography variant="body2" color="textSecondary" component="p">
          Please select a state
        </Typography>
      </Card>
    );
  };

  const renderWeather = (weather) => {
    return (
      <React.Fragment>
        <Table className="weather-details">
          <TableBody>
            {weather.details.map((detail) => {
              const { label, value } = detail;
              return (
                <TableRow key={label}>
                  <TableCell>{label}</TableCell>
                  <TableCell className="cell-data">{value}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </React.Fragment>
    );
  };

  return (
    <Container maxWidth="sm">
      {selectedState && selectedState.stateName
        ? renderStateCard(selectedState)
        : renderEmptyCard()}
    </Container>
  );
};

export default Panel;
