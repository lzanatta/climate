# climate
A simple JavaScript library for weather information.

Weather data is fetched from [APIXU](https://www.apixu.com/).

## Usage

```javascript
const climate = require( './climate.js' );

// Supply your API key
climate.init( 'YOUR_API_KEY' );

// Pass a location's latitude and longitude, in decimal degrees
// Middle of London
climate.getTemperature( 51.513214, -0.094938 )
       .then( result => console.log( result ) )
       .catch( err => console.log( err ) );
```

*climate* returns a ```Promise```, which resolves to a ```object``` with weather information, like this:

```javascript
{
    location: 'London, City of London, Greater London, United Kingdom',
    coordinates: {
        latitude: 51.51,
        longitude: -0.09
    },
    temperature: {
        current: 10,
        apparent: 10,
        min: 7.7,
        max: 14
    }
}
```

```javascript
// You can also pass a string with a location name
climate.getTemperature( 'los angeles' );
```
```javascript
{
    location: 'Los Angeles, California, United States of America',
    coordinates: {
        latitude: 34.05,
        longitude: -118.24
    },
    temperature: {
        current: 18.9,
        apparent: 18.9,
        min: 15.6,
        max: 22.3
    }
}
```

In case of an error, *climate* resolves to an ```error```. For example:

```javascript
climate.getTemperature( 'tatooine' );
```
```javascript
{'error':{'code':1006,'message':'No matching location found.'}}
```

Temperatrue information is given in **degrees Celsius**.

## License

[MIT](LICENSE)
