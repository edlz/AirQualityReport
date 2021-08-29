import React, { useState, useEffect } from "react";
import { Grid, Button, TextField } from "@material-ui/core";
import axios from "axios";

// components
import Metrics from "./Metrics";
// styles
import "./Site.css";

const Site = () => {
  // state
  const [IP, setIP] = useState("");
  const [message, setMessage] = useState("");
  const [locationString, setLocationString] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [loading, setLoading] = useState(true);
  const [ipSearchError, setIpError] = useState(false);

  // mounting
  useEffect(async () => {
    await getIP();
    getDataWithIP();
  }, []);
  // update locationString
  useEffect(() => {
    if (city.length == 0 || state.length == 0) {
      setLocationString("");
    } else {
      setLocationString(city + ", " + state);
    }
    if (message.startsWith("Error")) {
      setLocationString("Error");
    }
  }, [loading]);

  // functions
  const setLocation = (city, state, country) => {
    setState(state);
    setCity(city);
    setCountry(country);
  };

  const getIP = async () => {
    const res = await axios.get(
      "https://v6q7nq61ab.execute-api.us-west-1.amazonaws.com/default/getAirQuality"
    );
    if (res.data.ip) {
      setIP(res.data.ip);
      return res.data.ip;
    }
  };

  const getDataWithIP = async () => {
    setLoading(true);
    const d = await axios.get(
      `https://dyrbwt49he.execute-api.us-west-1.amazonaws.com/default/getAirQuality?ip=${IP}`
    );
    if (d.data.error) {
      setMessage("Error - " + d.data.error);
      setIpError(true);
    } else if (d.data.data) {
      setLocation(d.data.data.city, d.data.data.state, d.data.data.country);
      setMessage(`${d.data.data.current.pollution.aqius}`);
      setIpError(false);
    } else {
      setMessage("Error");
      setIpError(true);
    }
    setLoading(false);
  };
  const searchData = async () => {
    setIpError(false);
    setLoading(true);
    const d = await axios.get(
      `https://dyrbwt49he.execute-api.us-west-1.amazonaws.com/default/getAirQuality?state=${state}&city=${city}&country=${country}`
    );
    if (d.data.error || d.data.data == null) {
      setMessage("Error");
    } else {
      setLocation(d.data.data.city, d.data.data.state, d.data.data.country);
      setMessage(`US AQI ${d.data.data.current.pollution.aqius}`);
    }
    setLoading(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    searchData();
  };

  return (
    <Grid container spacing={3} className="main-container">
      <Grid item container spacing={3} xs={12} direction="row">
        <Metrics
          IP={IP}
          locationString={locationString}
          message={message}
          loading={loading}
        />

        <Grid
          container
          item
          xs={12}
          justifyContent="center"
          className="button-container"
        >
          <Button
            variant="contained"
            color={ipSearchError ? "secondary" : "primary"}
            onClick={getDataWithIP}
            className="btn"
          >
            Reload IP Search
          </Button>
        </Grid>
        <Grid
          container
          item
          sm={12}
          spacing={3}
          direction="row"
          alignItems="center"
          justifyContent="center"
          className="search-container"
        >
          <Grid item sm={12} container justifyContent="center">
            <form onSubmit={handleSearch}>
              <TextField
                className="search-input"
                id="filled-basic"
                label="City"
                variant="filled"
                required
                value={city}
                onChange={(e) => {
                  setCity(e.target.value);
                }}
              />
              <TextField
                className="search-input"
                id="filled-basic"
                label="State"
                variant="filled"
                required
                value={state}
                onChange={(e) => {
                  setState(e.target.value);
                }}
              />
              <TextField
                className="search-input"
                id="filled-basic"
                label="Country"
                variant="filled"
                value={country}
                onChange={(e) => {
                  setCountry(e.target.value);
                }}
                required
              />

              <Button
                className="btn"
                variant="contained"
                color="primary"
                type="submit"
              >
                Search
              </Button>
            </form>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Site;
