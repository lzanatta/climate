const weather = require( './climate/core.js' );

function init( arg ) {
   weather.setKey( arg ); 
}

async function getTemperature( ...args ) {
  let result;
  let weatherData;
  let query;

  if ( args.length === 1) {
    query = '&q=' + args;
  } else if ( args.length === 2) {
    query = '&q=' + args[0].toString() + ',' + args[1].toString();
  } else {
    throw new Error( 'Unexpected arguments' );
  }

  try {
    weatherData = await weather.getWeatherData( query );
    result = weather.createWeatherReport( weatherData );
    return result;
  } catch ( error ) {
    throw error;
  }
}

module.exports = { init, getTemperature };
