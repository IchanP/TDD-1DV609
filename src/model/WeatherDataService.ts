import { WeatherDataProvider } from './WeatherDataProvider'

/**
 * Class for handling weather data returned from the OpenWeatherMap API.
 */
export class WeatherDataService {
  provider : IWeatherProvider = new WeatherDataProvider()

  /**
   * Adds a provider to the service.
   *
   * @param {IWeatherProvider} provider - The provider to add.
   */
  addProvider (provider: IWeatherProvider) : void {
    this.provider = provider
  }

  /**
   *
   * @param latAndLong
   */
  fetchCurrentWeatherData (latAndLong: LocationData) : CurrentWeather {
    this.provider.fetchCurrentWeatherData(latAndLong)
    return { nameOfLocation: 'Motala', temperature: 10, description: 'Scattered Clouds', mainWeather: 'Clouds', pictureIcon: '10d' }
  }
}
