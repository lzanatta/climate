const report = require( './weather_report' );

const mockData = '{"location":{"name":"MOCK NAME","region":"MOCK REGION","country":"MOCK COUNTRY","lat":0.0,"lon":0.0,"tz_id":"America/Los_Angeles","localtime_epoch":1556853735,"localtime":"2019-05-02 20:22"},"current":{"last_updated_epoch":1556853307,"last_updated":"2019-05-02 20:15","temp_c":5000.0,"temp_f":62.1,"is_day":0,"condition":{"text":"Clear","icon":"//cdn.apixu.com/weather/64x64/night/113.png","code":1000},"wind_mph":0.0,"wind_kph":0.0,"wind_degree":0,"wind_dir":"N","pressure_mb":1014.0,"pressure_in":30.4,"precip_mm":0.0,"precip_in":0.0,"humidity":75,"cloud":0,"feelslike_c":5000.1,"feelslike_f":62.1,"vis_km":16.0,"vis_miles":9.0,"uv":0.0,"gust_mph":9.6,"gust_kph":15.5},"forecast":{"forecastday":[{"date":"2019-05-02","date_epoch":1556755200,"day":{"maxtemp_c":9999.9,"maxtemp_f":72.9,"mintemp_c":0.0,"mintemp_f":61.0,"avgtemp_c":20.2,"avgtemp_f":68.3,"maxwind_mph":9.2,"maxwind_kph":14.8,"totalprecip_mm":0.0,"totalprecip_in":0.0,"avgvis_km":19.5,"avgvis_miles":12.0,"avghumidity":63.0,"condition":{"text":"Partly cloudy","icon":"//cdn.apixu.com/weather/64x64/day/116.png","code":1003},"uv":8.4},"astro":{"sunrise":"06:03 AM","sunset":"07:38 PM","moonrise":"05:08 AM","moonset":"05:38 PM"}}]}}';

const mockTrash = '{"locati NAME","region":"MOCK REGION","country":"MOCK CO":0.0"lon":0.0,"tz_id":"America/Lgelescaltime_epoch":1556853735,"localtime":"2019-05Clear","icon":"//cdn.aweather/6avgtemp_c":20.2,"avgtemp_f":68.3,"maxwind_mph":9.2,"maxwind_kp14.talprecip_mm":0.0,"totalprecipvgvis_km":19.5,"avgvis_miles":12.0,"avghumidity":63.0,"condition":{"text":"Partly cloudy","icon":"//cdn.apixu.com/weather/64x64/day/116.png","code":1003},"uv":8.4},"astro":{"sunr"06:03 AM","sunset":"07:38 PM","moonrise":"05:08 AM","moonset":"05:38 PM}}';

const mockReply = {
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

// Testing with good data
it( 'should return a nice weather report', () => {
  expect( report.createWeatherReport( mockData )).toEqual( mockReply );
});

// Testing with bad data
it( 'should throw a error', () => {
  expect( () => report.createWeatherReport( mockTrash )).toThrow();
});
