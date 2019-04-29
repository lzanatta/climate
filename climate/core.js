const https = require( 'https' );

let API_KEY = 0;

function setKey( key ){
  API_KEY = 'key=' + key;
}

const getWeatherData = query => new Promise( ( resolve, reject ) => {
  const source = 'https://api.apixu.com/v1/forecast.json?';
  const target = source + API_KEY + query;

  https.get( target, response => {
    let data = '';
    response.on( 'data', chunk => data += chunk );
    response.on( 'end', () => {
      if ( response.statusCode !== 200 ) {
        reject( new Error( data ) );
      } else {
        resolve( data );
      }
      // resolve( data );
    });
    // response.on( 'error', err => reject( err ) );
  }).on( 'error', err => reject( err ) );
});

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
        sensation: rawData.current.feelslike_c,
        min: rawData.forecast.forecastday[0].day.mintemp_c,
        max: rawData.forecast.forecastday[0].day.maxtemp_c
      }
    };
    return weatherReport;
  } catch ( error ) {
    throw error;
  }
}

module.exports = { getWeatherData, createWeatherReport, setKey};
