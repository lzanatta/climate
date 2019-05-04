const parse = require( './parse_weather_data' );
const rawApiResponse = require( './api_response_fixture' );

// Expected reply from 'parse_weather_data' looks like this
const expectedReply = {
  location: 'Porto Alegre, Rio Grande do Sul, Brazil',
  coordinates: {
    latitude: -30.03,
    longitude: -51.2
  },
  temperature: {
    current: 26.0,
    apparent: 28.9,
    min: 21.9,
    max: 30.2
  }
};

describe( 'parse_weather_data spec', () => {
  // Testing with good data
  it( 'Should convert the raw response from the weather API to the expect format', () => {
    const result = parse( rawApiResponse );
    expect( result ).toEqual( expectedReply );
  } );
} );
