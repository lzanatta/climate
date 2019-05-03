// Format API response to a simplified report
module.exports = data => ( {
  location: `${data.location.name}, ${data.location.region}, ${data.location.country}`,
  coordinates: {
    latitude: data.location.lat,
    longitude: data.location.lon
  },
  temperature: {
    current: data.current.temp_c,
    apparent: data.current.feelslike_c,
    min: data.forecast.forecastday[0].day.mintemp_c,
    max: data.forecast.forecastday[0].day.maxtemp_c
  }
} );
