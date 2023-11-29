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
  async fetchCurrentWeatherData (latAndLong: LocationData) : Promise<CurrentWeather> {
    const jsonObject = await this.provider.fetchCurrentWeatherData(latAndLong)

    return {
      nameOfLocation: jsonObject.name,
      temperature: jsonObject.main.temp,
      description: jsonObject.weather[0].description,
      mainWeather: jsonObject.weather[0].main,
      pictureIcon: jsonObject.weather[0].icon
    }
  }
}
