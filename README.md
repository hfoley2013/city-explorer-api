# City Explorer API

* **Author**: Harper Foley
* **Version**: 2.0.1

## Overview

Builds out API for City Explorer web application. The server utilizes API calls to [WeatherBit](https://www.weatherbit.io/) to pull a 3 day weather forecast and queries [The Movie Database (TMDB)](https://www.themoviedb.org/) to generate a list of movies featuring the queried city. <br>

The server now features a caching system to the weather and movie data. The default cache time for weather is 5:00 minutes and 7 days for movie data. The cache will be cleared and a new API call conducted if the cached data is non-existent, outdated, or a new city is queried.

## Getting Started

* Clone down the repo to your local machine: `git clone https://github.com/hfoley2013/city-explorer-api.git`
* Set environmental variables in the provided `.env.sample` file to reflect your API keys

## Architecture

* The code is broken out into three files to handle specific functions:
  1. `server.js` calls the `weather` and `movies` functions and returns the result of their queries to the front end.
  2. `weather.js` utilizes `axios` to query the WeatherBit API for the specific latitude and longitude of the city input by the user. The query is then stored in the `cache` for later reference.
  3. `movies.js` utilizes `axios` to query the TMDB API for movies featuring the name of the city input by the user.
* For the code to function, you will need to obtain API keys from the sites listed above and store them in a `.env` file.
  * A sample file has been provided. You will need to update the file to the desired PORT for local testing and input your actual API keys.

## Change Log

* 11-15-2022 2:18pm, repo initialization
* 11-17-2022 4:14pm, moves weather and movies into separate modules
* 11-18-2022 2:56pm, adds caching to weather and movies data
