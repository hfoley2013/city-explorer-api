const axios = require('axios');
let cache = {
  cachedMovies: null,
  movieTimestamp: null,
  searchedValue: null
};

let movies = async function(request, response) {
  // cache variables
  let timeToTestCache = 1000 * 60 * 60 * 24 * 7 * 4; //store movies for one month
  let timeRightNow = Date.now();
  // query variables
  let searchTerm = request.query.search;
  if(cache && timeRightNow - cache.movieTimestamp < timeToTestCache && cache.searchedValue === searchTerm) {
    console.log('Data stored in cache');
    response.status(200).send(cache.cachedMovies);
  } else {
    let movieURL = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${searchTerm}`;
    let movieResults = await axios.get(movieURL);
    let topMovies = movieResults.data.results.map(movie => new Movie(movie));
    topMovies.length < 1 ? response.status(500).send('Error. Movie not found.') : response.status(200).send(topMovies);
    cache.cachedMovies = topMovies;
    cache.movieTimestamp = Date.now();
    cache.searchedValue = searchTerm;
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

module.exports = movies;
