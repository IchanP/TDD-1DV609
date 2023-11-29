/**
 * A wrapper for fethcing weather data from the OpenWeatherMap API.
 */
export class WeatherDataProvider {
  /**
   * Fetches the weather data.
   *
   * @param {LocationData} latAndLong - The necessary latitude and longitude to fetch the weather data.
   */
  async fetchCurrentWeatherData (latAndLong: LocationData) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latAndLong.lat}&lon=${latAndLong.lon}&appid=${process.env.API_KEY}`)
  }
}
