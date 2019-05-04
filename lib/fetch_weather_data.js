const https = require( 'https' );

// Fetch weather data from API
module.exports = ( args, key ) => new Promise( ( resolve, reject ) => {
  const url = `https://api.apixu.com/v1/forecast.json?q=${args.join( ',' )}&key=${key}`;

  https.get( url, response => {
    let data = '';
    response.on( 'data', chunk => data += chunk );
    response.on( 'end', () => {
      if ( response.statusCode !== 200 ) {
        reject( new Error( data ) );
      } else {
        resolve( JSON.parse( data ) );
      }
    } );
  } ).on( 'error', err => reject( err ) );
} );
