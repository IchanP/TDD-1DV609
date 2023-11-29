/**
 * Class for handling weather data returned from the OpenWeatherMap API.
 */
export class WeatherDataService {
  /**
   *
   * @param latAndLong
   */
  fetchCurrentWeatherData (latAndLong: LocationData) : CurrentWeather {
    return { nameOfLocation: 'Motala', temperature: 10, description: 'Scattered Clouds', mainWeather: 'Clouds', pictureIcon: '10d' }
  }
}
