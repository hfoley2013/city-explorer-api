'use strict';

console.log('our first server');

// REQUIRE
const express = require('express');
require('dotenv').config();
const cors = require('cors');
const axios = require('axios');
var weather = require('./weather.js');
var movies = require('./movies.js');

// USE
const app = express();
const PORT=process.env.PORT || 3002;
app.use(cors());


// ROUTES
// app.get() correlates to axios.get()

app.get('/weather', weather);
app.get('/movie', movies);


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

class Movie {
  constructor(movieObj) {
    this.title = movieObj.title;
    this.overview = movieObj.overview;
    this.averageRating = movieObj.vote_average;
    this.totalReviews = movieObj.vote_count;
    this.imgPath = movieObj.poster_path ? `https://image.tmdb.org/t/p/original/${movieObj.poster_path}` : '';
    this.releaseDate = movieObj.release_date;
  };
};
