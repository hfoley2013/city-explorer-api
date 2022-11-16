'use strict';

console.log('our first server');

// REQUIRE
const express = require('express');
let weatherData = require('./data/weather.json');
require('dotenv').config();
const cors = require('cors');

// USE
const app = express();
const PORT=process.env.PORT || 3002;
app.use(cors());


// ROUTES
// app.get() correlates to axios.get()
app.get('/', (request, response) => {
  response.send('Hello, from our server');
});

app.get('/weather', (request, response) => {
  let lat = request.query.lat;
  let lon = request.query.lon;
  let searchQuery = weatherData.filter(city => (city.lat === lat && city.lon === lon));
  let threeDayForecast = new Forecast(searchQuery);
  threeDayForecast.length < 1 ? response.status(500).send('Error. City not covered by system.') : response.status(200).send(threeDayForecast);
});

// this will run for any route not defined above
app.get('*', (request, response) => {
  response.send('That route does not exist');
});

// ERRORS

// LISTEN
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));


// CLASSES

class Forecast {
  constructor(weatherObj) {
    this.day1 = {
      date: weatherObj[0].data[0].datetime,
      description: `Low of ${weatherObj[0].data[0].min_temp}, high of ${weatherObj[0].data[0].max_temp} with ${weatherObj[0].data[0].weather.description.toLowerCase()}`
    };
    this.day2 = {
      date:  weatherObj[0].data[1].datetime,
      description: `Low of ${weatherObj[0].data[1].min_temp}, high of ${weatherObj[0].data[1].max_temp} with ${weatherObj[0].data[1].weather.description.toLowerCase()}`
    };
    this.day3 = {
      date:  weatherObj[0].data[2].datetime,
      description: `Low of ${weatherObj[0].data[2].min_temp}, high of ${weatherObj[0].data[2].max_temp} with ${weatherObj[0].data[2].weather.description.toLowerCase()}`
    };
  };
};
