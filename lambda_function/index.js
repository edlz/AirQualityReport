const axios = require("axios");
const stringSimilarity = require("string-similarity");

const API_AIR_KEY = "SECRET";
const API_IP_KEY = "SECRET";

exports.handler = async (event) => {
  try {
    let { ip, state, city, country } = event;
    if (ip == null && city == null) {
      return { ip: event.headers["x-forwarded-for"] };
    }
    if (ip != null) {
      const getLoc = await axios({
        url: `http://api.ipstack.com/${ip}?access_key=${API_IP_KEY}`,
        method: "get",
      });
      // testing
      //console.log(getLoc.data);

      state = getLoc.data.region_name;
      city = getLoc.data.city;
      if ("United States" == getLoc.data.country_name) {
        country = "USA";
      } else {
        country = getLoc.data.country_name;
      }
    }
    // autocorrect country, state, city
    const countriesRes = await axios({
      url: `http://api.airvisual.com/v2/countries?key=${API_AIR_KEY}`,
      method: "get",
    });
    const countriesList = countriesRes.data.data.map((element) =>
      element.country.toLowerCase()
    );
    countriesList.push("United States");
    const countriesMatch = stringSimilarity.findBestMatch(
      country.toLowerCase(),
      countriesList
    );
    //console.log(countriesMatch);
    country = countriesMatch.bestMatch.target;
    // air api has united states as USA
    if ("United States" == country) {
      country = "USA";
    }
    // match valid states
    const statesRes = await axios({
      url: `http://api.airvisual.com/v2/states?country=${country}&key=${API_AIR_KEY}`,
      method: "get",
    });
    const statesList = statesRes.data.data.map((element) =>
      element.state.toLowerCase()
    );
    const stateMatch = stringSimilarity.findBestMatch(
      state.toLowerCase(),
      statesList
    );
    state = stateMatch.bestMatch.target;
    // match valid cities
    const citiesRes = await axios({
      url: `http://api.airvisual.com/v2/cities?state=${state}&country=${country}&key=${API_AIR_KEY}`,
      method: "get",
    });
    const citiesList = citiesRes.data.data.map((element) =>
      element.city.toLowerCase()
    );
    const cityMatch = stringSimilarity.findBestMatch(
      city.toLowerCase(),
      citiesList
    );
    //console.log(cityMatch);
    city = cityMatch.bestMatch.target;

    const res = await axios({
      url: `http://api.airvisual.com/v2/city?city=${city}&state=${state}&country=${country}&key=${API_AIR_KEY}`,
      method: "get",
    });
    //testing
    //console.log(res.data);

    return res.data;
  } catch (e) {
    console.log(e);
    return { error: "Server error" };
  }
};
