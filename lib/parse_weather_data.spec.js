const parse = require( './parse_weather_data' );
const rawApiResponse = require( './api_response_fixture' );

const expectedReply = {
  location: 'MOCK NAME, MOCK REGION, MOCK COUNTRY',
  coordinates: {
    latitude: 0.0,
    longitude: 0.0
  },
  temperature: {
    current: 5000.0,
    apparent: 5000.1,
    min: 0.0,
    max: 9999.9
  }
};

describe( 'weatherReport spec', () => {
  // Testing with good data
  it( 'should convert the rawResponse from the Weather API to the expect format', () => {
    const result = parse( rawApiResponse );
    expect( result ).toEqual( expectedReply );
  } );
} );
