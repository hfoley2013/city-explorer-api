# City Explorer API

* **Author**: Harper Foley
* **Version**: 2.0.1

## Overview

Builds out API for City Explorer web application. The server utilizes API calls to [WeatherBit](https://www.weatherbit.io/) to pull a 3 day weather forecast and queries [The Movie Database (TMDB)](https://www.themoviedb.org/) to generate a list of movies featuring the queried city. <br>

The server now features a caching system to the weather and movie data. The default cache time for weather is 5:00 minutes and 7 days for movie data. The cache will be cleared and a new API call conducted if the cached data is non-existent, outdated, or a new city is queried.

## Getting Started

* TODO

## Architecture

* TODO

## Change Log

* 11-15-2022 2:18pm, repo initialization
* 11-17-2022 4:14pm, moves weather and movies into separate modules
* 11-18-2022 2:56pm, adds caching to weather and movies data
