'use strict';

console.log('our first server');

// REQUIRE
const express = require('express');
require('dotenv').config();
const cors = require('cors');
const axios = require('axios');

// USE
const app = express();
const PORT=process.env.PORT || 3002;
app.use(cors());


// ROUTES
// app.get() correlates to axios.get()

app.get('/weather', async (request, response) => {
  let lat = request.query.lat;
  let lon = request.query.lon;
  console.log(request);
  let weatherURL = `http://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&days=3&key=${process.env.WEATHER_API_KEY}`;
  let searchQuery = await axios.get(weatherURL);
  let threeDayForecast = searchQuery.data.data.map(day => new Forecast(day));
  threeDayForecast.length < 1 ? response.status(500).send('Error. City not covered by system.') : response.status(200).send(threeDayForecast);
});

app.get('/', (request, response) => {
  response.send('Hello, from our server');
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
    console.log('weatherObj:', weatherObj);
    this.date = weatherObj.datetime;
    this.description = weatherObj.weather.description.toLowerCase();
    this.low = weatherObj.low_temp;
    this.high = weatherObj.max_temp;
    this.fullDescription = `Low of ${this.low}, high of ${this.high} with ${this.description}.`;
  };
};
