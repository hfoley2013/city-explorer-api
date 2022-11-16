'use strict';

console.log('our first server');

// REQUIRE
const express = require('express');
let weatherData = require('./data/weather.json');
require('dotenv').config();

// USE
const app = express();
const PORT=process.env.PORT || 3002;


// ROUTES
// app.get() correlates to axios.get()
app.get('/', (request, response) => {
  response.send('Hello, from our server');
});

app.get('/weather', (request, response) => {
  let lat = request.query.lat;
  let lon = request.query.lon;
  let searchQuery = weatherData.filter(city => (city.lat === lat && city.lon === lon));
  
  searchQuery.length < 1 ? response.status(500).send('Error. City not covered by system.') : response.status(200).send(searchQuery);
});

// this will run for any route not defined above
app.get('*', (request, response) => {
  response.send('That route does not exist');
});

// ERRORS

// LISTEN
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
