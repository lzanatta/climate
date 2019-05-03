// Format API response to a simplified report
function createWeatherReport( weatherData ) {
  let rawData;
  let weatherReport;

  try {
    rawData = JSON.parse( weatherData );
    weatherReport = {
      location: rawData.location.name + ', ' + rawData.location.region + ', ' + rawData.location.country, 
      coordinates: { 
        latitude: rawData.location.lat,
        longitude: rawData.location.lon
      }, 
      temperature: {
        current: rawData.current.temp_c,
        apparent: rawData.current.feelslike_c,
        min: rawData.forecast.forecastday[0].day.mintemp_c,
        max: rawData.forecast.forecastday[0].day.maxtemp_c
      }
    };
    return weatherReport;
  } catch ( error ) {
    throw error;
  }
}

module.exports = { createWeatherReport };
