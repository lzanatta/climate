const fetchData = require( './lib/fetch_weather_data' );
const parse = require( './lib/parse_weather_data' );

let apiKey;

const parseArgs = args => {
  if ( args.length > 2 || args.length === 0 ) {
    throw new Error( 'Unexpected arguments' );
  }
  return args;
};

// Set API key
const init = key => apiKey = key;

// Get weather from location
const getTemperature = async ( ...args ) => {
  const apiArgs = parseArgs( args );

  try {
    const result = await fetchData( apiArgs, apiKey );
    return parse( result );
  } catch ( error ) {
    throw error;
  }
};

module.exports = { init, getTemperature };
