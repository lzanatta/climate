const { randomBytes } = require( 'crypto' );

const index = require( './' );
const fetchData = require( './lib/fetch_weather_data' );
const parse = require( './lib/parse_weather_data' );
const apiResponse = require( './lib/api_response_fixture' );

jest.mock( './lib/parse_weather_data', () => jest.fn() );
jest.mock( './lib/fetch_weather_data', () => jest.fn() );

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

const apiKey = randomBytes( 12 ).toString( 'hex' );
const location = 'Porto Alegre';
const lat = -30.03;
const long = -51.2;

describe( 'Climate lib spec', () => {

  afterEach( () => {
    fetchData.mockReset();
    parse.mockReset();
  } );

  describe( '.getTemperature spec', () => {
    it( 'Should init the API with the key, call the weather API with the location string and parse the response', async () => {
      fetchData.mockResolvedValue( apiResponse );
      parse.mockReturnValue( expectedReply );

      index.init( apiKey );

      const result = await index.getTemperature( location );

      expect( result ).toEqual( expectedReply );
      expect( fetchData ).toHaveBeenCalledWith( [ location ], apiKey );
      expect( parse ).toHaveBeenCalledWith( apiResponse );
    } );

    it( 'Should init the API with the key, call the weather API with the geo coords and parse the response', async () => {
      fetchData.mockResolvedValue( apiResponse );
      parse.mockReturnValue( expectedReply );

      index.init( apiKey );

      const result = await index.getTemperature( lat, long );

      expect( result ).toEqual( expectedReply );
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
