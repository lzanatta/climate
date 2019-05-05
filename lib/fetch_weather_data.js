const https = require( 'https' );
const { URL } = require( 'url' );

const config = require( './config' );

// Fetch weather data from API
module.exports = ( args, key ) => new Promise( ( resolve, reject ) => {
  const url = new URL( `${config.apiUrl}?q=${encodeURIComponent( args.join( ',' ) )}&key=${encodeURIComponent( key )}` );

  const req = https.request( url, res => {
    let data = '';
    res.on( 'data', chunk => data += chunk );
    res.on( 'end', () => {
      if ( res.statusCode !== 200 ) {
        reject( new Error( data ) );
      } else {
        resolve( JSON.parse( data ) );
      }
    } );
  } );
  req.on( 'error', err => reject( err ) ).end();
} );
