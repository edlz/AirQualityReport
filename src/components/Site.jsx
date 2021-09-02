import React, { useState, useEffect } from "react";
import { Grid, Button, TextField } from "@material-ui/core";
import axios from "axios";

// components
import Metrics from "./Metrics";
// styles
import "./Site.css";

const Site = () => {
  // messages
  const [message, setMessage] = useState("");
  const [locationString, setLocationString] = useState("");
  const [aqiColor, setAqiColor] = useState("");
  // info
  const [IP, setIP] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [aqi, setAqi] = useState(null);
  // state
  const [loading, setLoading] = useState(true);
  const [ipSearchError, setIpError] = useState(false);

  // mounting
  useEffect(() => {
    getIP().then((ipv4) => getDataWithIP(ipv4));
  }, []);
  // update locationString
  useEffect(() => {
    if (city.length === 0 || state.length === 0) {
      setLocationString("");
    } else {
      setLocationString(city + ", " + state);
    }
    if (message.startsWith("Error")) {
      setLocationString("Error");
    }
  }, [loading]);
  // aqi message
  useEffect(() => {
    if (aqi) {
      if (aqi <= 50) {
        setMessage(`${aqi} - Good`);
        setAqiColor("green");
      } else if (aqi <= 100) {
        setMessage(`${aqi} - Moderate`);
        setAqiColor("yellow");
      } else if (aqi <= 150) {
        setMessage(`${aqi} - Unhealthy for Sensitive Groups`);
        setAqiColor("orange");
      } else if (aqi <= 200) {
        setMessage(`${aqi} - 	Unhealthy`);
        setAqiColor("red");
      } else if (aqi <= 300) {
        setMessage(`${aqi} - 	Very Unhealthy`);
        setAqiColor("purple");
      } else {
        setMessage(`${aqi} - 	Hazardous`);
        setAqiColor("crimson");
      }
    } else {
      setAqiColor("");
    }
  }, [aqi]);
  useEffect(() => {
    if (message.startsWith("Error")) {
      setAqi(null);
    }
  }, [message]);

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

  const getDataWithIP = async (ipv4) => {
    setLoading(true);
    const d = await axios.get(
      `https://dyrbwt49he.execute-api.us-west-1.amazonaws.com/default/getAirQuality?ip=${ipv4}`
    );
    if (d.data.error) {
      setMessage("Error - " + d.data.error);
      setIpError(true);
    } else if (d.data.data) {
      setLocation(d.data.data.city, d.data.data.state, d.data.data.country);
      setAqi(d.data.data.current.pollution.aqius);
      setIpError(false);
    } else {
      setMessage("Unexpected Error");
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
      setMessage("Error - " + d.data.error);
    } else {
      setLocation(d.data.data.city, d.data.data.state, d.data.data.country);
      setAqi(d.data.data.current.pollution.aqius);
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
          aqiColor={aqiColor}
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
            onClick={() => getDataWithIP(IP)}
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
