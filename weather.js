const axios = require('axios');

let weather = async function(request, response) {
    let lat = request.query.lat;
    let lon = request.query.lon;
    let weatherURL = `http://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&days=3&key=${process.env.WEATHER_API_KEY}`;
    let searchQuery = await axios.get(weatherURL);
    let threeDayForecast = searchQuery.data.data.map(day => new Forecast(day));
    threeDayForecast.length < 1 ? response.status(500).send('Error. City not covered by system.') : response.status(200).send(threeDayForecast);
};

class Forecast {
    constructor(weatherObj) {
      console.log('weatherObj:', weatherObj);
      this.date = weatherObj.datetime;
      this.description = weatherObj.weather.description.toLowerCase();
      this.low = weatherObj.low_temp;
      this.high = weatherObj.max_temp;
      this.fullDescription = `Low of ${this.low}, high of ${this.high} with ${this.description}.`;
    };
  };

module.exports = weather;
