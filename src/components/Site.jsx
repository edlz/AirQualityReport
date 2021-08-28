import React, { useState, useEffect } from "react";
import axios from "axios";

import "./Site.css";
const Site = () => {
  const [IP, setIP] = useState("?");
  const [message, setMessage] = useState("Loading Data...");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");

  const getData = async () => {
    const res = await axios.get(
      "https://v6q7nq61ab.execute-api.us-west-1.amazonaws.com/default/getAirQuality"
    );
    setIP(res.data.ip);
    setTimeout(1000);
    const d = await axios.get(
      `https://dyrbwt49he.execute-api.us-west-1.amazonaws.com/default/getAirQuality?ip=${IP}`
    );
    if (d.data.error) {
      setMessage("Error requesting from API");
    } else {
      setState(d.data.data.state);
      setCity(d.data.data.city);
      setMessage(`US AQI ${d.data.data.current.pollution.aqius}`);
    }
  };
  const reloadData = async () => {
    setMessage("Reloading...");
    const d = await axios.get(
      `https://dyrbwt49he.execute-api.us-west-1.amazonaws.com/default/getAirQuality?ip=${IP}`
    );
    if (d.data.error) {
      setMessage("Error requesting from API");
    } else {
      setState(d.data.data.state);
      setCity(d.data.data.city);
      setMessage(`US AQI ${d.data.data.current.pollution.aqius}`);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="main-container">
      <div>
        <div className="ip-text">IP: {IP}</div>
        <div className="location-text">
          Location: {city.length > 0 ? `${city}, ${state}` : "?"}
        </div>
        <div className="quality-text">Air Quality : {message}</div>
        <button className="btn" onClick={reloadData}>
          Reload Data
        </button>
      </div>
      <div>
        <input></input>
        <input></input>
        <input></input>
        <button className="btn">Search</button>
      </div>

      <div className="quality-bar">a</div>
    </div>
  );
};

export default Site;
