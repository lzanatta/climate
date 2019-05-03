const https = require( 'https' );

// Fetch weather data from API
const getWeatherData = ( query, key ) => new Promise( ( resolve, reject ) => {
  const source = 'https://api.apixu.com/v1/forecast.json?';
  const target = source + key + query;

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

module.exports = { getWeatherData };
