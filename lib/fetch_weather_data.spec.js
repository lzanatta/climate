const nock = require( 'nock' );
const { randomBytes } = require( 'crypto' );

const fetchData = require( './fetch_weather_data' );
const rawApiResponse = require( './api_response_fixture' );

const lat = -30.03;
const long = -51.2;
const args = [ lat, long ];
const key = randomBytes( 12 ).toString( 'hex' );

describe( 'fetch_weather_data spec', () => {
  it( 'Should make a request to the weather API and get a response (JSON format) with weather data', () => {
    nock( 'https://api.apixu.com/v1/' )
      .persist()
      .get( `forecast.json?q=${args.join( ',' )}&key=${key}` )
      .reply( 200, rawApiResponse );

    return fetchData( args, key ).then( resp => expect( resp ).toEqual( rawApiResponse ) );
  } );
} );
