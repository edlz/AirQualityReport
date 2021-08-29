import React, { Fragment } from "react";
import { Grid, CircularProgress } from "@material-ui/core";

const Metrics = ({ IP, locationString, message, loading }) => {
  return (
    <Fragment>
      <Grid item sm={5} className="label-container">
        IP:
      </Grid>
      <Grid item sm={7} className="metric-container">
        {IP.length > 0 ? IP : <CircularProgress color="secondary" />}
      </Grid>
      <Grid item sm={5} className="label-container">
        Location:
      </Grid>
      <Grid item sm={7} className="metric-container">
        {!loading ? locationString : <CircularProgress color="secondary" />}
      </Grid>
      <Grid item sm={5} className="label-container">
        Air Quality :
      </Grid>
      <Grid item sm={7} className="metric-container">
        {!loading ? message : <CircularProgress color="secondary" />}
      </Grid>
    </Fragment>
  );
};

export default Metrics;
