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
   * Fetches weather data from the provider.
   *
   * @param {LocationData}  latAndLong - The location data to use to fetch.'
   * @returns {Promise<CurrentWeather>} - The weather data.
   */
  async fetchCurrentWeatherData (latAndLong: LocationData) : Promise<CurrentWeather> {
    const unfilteredResponse = await this.provider.fetchCurrentWeatherData(latAndLong)
    const filteredResponse : CurrentWeather = this.#transformToCurrentWeather(unfilteredResponse)
    return filteredResponse
  }

  /**
   * Transforms the weather data to a CurrentWeather object.
   *
   * @param {object} weatherData - Object containing weather data.
   * @returns {CurrentWeather} - The transformed weather data.
   */
  #transformToCurrentWeather (weatherData: any) : CurrentWeather {
    return {
      nameOfLocation: weatherData.name,
      temperature: weatherData.main.temp,
      description: weatherData.weather[0].description,
      mainWeather: weatherData.weather[0].main,
      pictureIcon: weatherData.weather[0].icon
    }
  }
}
