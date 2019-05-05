const nock = require( 'nock' );
const { randomBytes } = require( 'crypto' );

const config = require( './config' );
const fetchData = require( './fetch_weather_data' );
const rawApiResponse = require( './api_response_fixture' );

const lat = -30.03;
const long = -51.2;
const args = [ lat, long ];
const key = randomBytes( 12 ).toString( 'hex' );

describe( 'fetch_weather_data spec', () => {
  it( 'Should make a request to the weather API and get a response (JSON format) with weather data', async () => {
    nock( `${config.apiUrl}` )
      .persist()
      .get( `q=${args.join( ',' )}&key=${key}` )
      .reply( 200, rawApiResponse );

    const result = await fetchData( args, key );
    expect( result ).toEqual( rawApiResponse );
  } );
} );
