import { WeatherDataProvider } from './WeatherDataProvider'

/**
 * Class for handling weather data returned from the OpenWeatherMap API.
 */
export class WeatherDataService {
  /**
   *
   */
  addProvider () {

  }

  /**
   *
   * @param latAndLong
   */
  fetchCurrentWeatherData (latAndLong: LocationData) : CurrentWeather {
    const weatherData = new WeatherDataProvider()
    weatherData.fetchCurrentWeatherData(latAndLong)
    return { nameOfLocation: 'Motala', temperature: 10, description: 'Scattered Clouds', mainWeather: 'Clouds', pictureIcon: '10d' }
  }
}
