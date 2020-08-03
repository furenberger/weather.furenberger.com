import React from "react";
import {
  Container,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  TextField,
  Typography,
  Button
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  card: {
    padding: 15,
    marginTop: 24,
    marginBottom: 24,
    minWidth: 275,
  },
  cardHeader: {},
  cardContent: {},
  media: {
    height: 0,
    margin: 15,
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
    paddingTop: "56.25%", // 16:9
  },
}));

const Panel = (props) => {
  const { selectedState } = props;
  const classes = useStyles();

  const renderStateCard = (selectedState) => {
    return (
      <React.Fragment>
        <Card className={classes.card}>
          <CardContent className={classes.cardContent}>
            <CardHeader
              className={classes.cardHeader}
              title={selectedState.stateName}
            />
            <CardMedia
              className={classes.media}
              image={selectedState.stateFlagUrl}
              title={selectedState.stateName + " state flag"}
            />
          </CardContent>
        </Card>
        <Card className={classes.card}>
          <CardContent className={classes.cardContent}>
            <CardHeader
              className={classes.cardHeader}
              title="Weather"
            />
            <TextField id="zipcode" required fullWidth label="Zip Code" autoComplete="billing postal-code"/>
            <Button variant="contained"
                      color="primary"
                      // onClick={this.handleNext}
                      >
                        Go!
                      </Button>
          </CardContent>
        </Card>
      </React.Fragment>
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

  return (
    <Container maxWidth="sm">
      {selectedState && selectedState.stateName
        ? renderStateCard(selectedState)
        : renderEmptyCard()}
    </Container>
  );
};

export default Panel;
