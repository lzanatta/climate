const index = require( './' );
const fetchData = require( './lib/fetch_weather_data' );
const parse = require( './lib/parse_weather_data' );
const apiResponse = require( './lib/api_response_fixture' );
const { randomBytes } = require( 'crypto' );

jest.mock( './lib/parse_weather_data', () => jest.fn() );
jest.mock( './lib/fetch_weather_data', () => jest.fn() );

const response = {
  location: 'Porto Alegre, Rio Grande do Sul, Brasil',
  coordinates: {
    latitude: -34.34,
    longitude: -48.43
  },
  temperature: {
    current: 22,
    apparent: 26,
    min: 29,
    max: 13
  }
};

const apiKey = randomBytes( 12 ).toString( 'hex' );
const location = 'Porto Alegre';
const lat = 10;
const long = 22;

describe( 'Climate lib spec', () => {

  afterEach( () => {
    fetchData.mockReset();
    parse.mockReset();
  } );

  describe( '.getTemperature', () => {
    it( 'Should init the api with the key, call weatherAPI with the location string and parse the responde', async () => {
      fetchData.mockResolvedValue( apiResponse );
      parse.mockReturnValue( response );

      index.init( apiKey );

      const result = await index.getTemperature( location );

      expect( result ).toEqual( response );
      expect( fetchData ).toHaveBeenCalledWith( [ location ], apiKey );
      expect( parse ).toHaveBeenCalledWith( apiResponse );
    } );

    it( 'Should init the api with the key, call weatherAPI with the get coords and parse the responde', async () => {
      fetchData.mockResolvedValue( apiResponse );
      parse.mockReturnValue( response );

      index.init( apiKey );

      const result = await index.getTemperature( lat, long );

      expect( result ).toEqual( response );
      expect( fetchData ).toHaveBeenCalledWith( [ lat, long ], apiKey );
      expect( parse ).toHaveBeenCalledWith( apiResponse );
    } );

    it( 'Should throw any APIs errors', async () => {
      const error = new Error( 'API Error' );
      fetchData.mockRejectedValue( error );

      index.init( apiKey );

      await expect( index.getTemperature( lat, long ) ).rejects.toThrow( error );

      expect( fetchData ).toHaveBeenCalledWith( [ lat, long ], apiKey );
      expect( parse ).not.toHaveBeenCalled();
    } );
  } );
} );
