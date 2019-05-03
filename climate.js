const data = require( './climate/weather_data' );
const report = require( './climate/weather_report' );

let API_KEY = 0;

// Set API key
function init( key ) {
  API_KEY = 'key=' + key;
}

// Get weather from location
async function getTemperature( ...args ) {
  let query;
  let result;
  let weather;

  if ( args.length === 1) {
    query = '&q=' + args;
  } else if ( args.length === 2) {
    query = '&q=' + args[0].toString() + ',' + args[1].toString();
  } else {
    throw new Error( 'Unexpected arguments' );
  }

  try {
    result = await data.getWeatherData( query, API_KEY );
    weather = report.createWeatherReport( result );
    return weather;
  } catch ( error ) {
    throw error;
  }
}

module.exports = { init, getTemperature };
