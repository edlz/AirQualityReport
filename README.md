# Checks air quality based off of ip or location search

Uses AWS Lambda to grab visiter ip address, convert it to a location, and query [AirVisual API](https://api-docs.iqair.com/?version=latest) for air quality data.

Made with React and Material UI components.

Available at https://ez0623.github.io/AirQualityReport/

## Notes

- [AirVisual API](https://api-docs.iqair.com/?version=latest) has an option to get the air quality directly by passing a IP address in the parameters but the free tier does not include this feature so the location is retrieved with http://api.ipstack.com/

- Not every city, state, and country is in the [AirVisual API](https://api-docs.iqair.com/?version=latest) so if a location not supported by the api is used, the closest matching name that is supported will be searched instead. This may lead to inaccurate data.

### Improvements

- It would be better to seperate the AWS Lambda function into 2 functions, 1 to get the user ip and another to get the air quality based off of location

- Instead of calling [AirVisual API](https://api-docs.iqair.com/?version=latest) 4 times per call to the AWS Lambda function, it would be better to store or cache all supported locations instead of asking for them each time.
