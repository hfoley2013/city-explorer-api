const axios = require('axios');

let weather = async function() {
    let lat = request.query.lat;
    let lon = request.query.lon;
    let weatherURL = `http://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&days=3&key=${process.env.WEATHER_API_KEY}`;
    let searchQuery = await axios.get(weatherURL);
    let threeDayForecast = searchQuery.data.data.map(day => new Forecast(day));
    threeDayForecast.length < 1 ? response.status(500).send('Error. City not covered by system.') : response.status(200).send(threeDayForecast);
};

module.exports = weather;
