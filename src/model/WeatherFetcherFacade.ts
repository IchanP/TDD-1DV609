import { WeatherDataService } from './WeatherDataService'

/**
 * Acts as a facade coordinating the weather fetching process.
 */
export class WeatherFetcherFacade {
  #locationService : ILocationService
  #weatherDataService : WeatherDataService
  /**
   * Initializes the location service field.
   *
   * @param {ILocationService} locationService - The location service to use.
   * @param {WeatherDataService} weatherDataService - The weather data service to use.
   */
  constructor (locationService : ILocationService, weatherDataService: WeatherDataService) {
    this.#locationService = locationService
    this.#weatherDataService = weatherDataService
  }

  /**
   * Fetches the weather data for a city.
   *
   * @param {string} cityName - The name of the city for which to fetch weather data.
   * @param {string} countryCode - The country code in ISO 3166 alpha-2 format https://www.iso.org/obp/ui/#search/code/
   * @param {UnitType} unitType - The unit type to use when fetching the weather data.
   * @returns {Promise<CurrentWeather>} - Returns a promise fetched from the DataService.
   */
  async fetchCurrentWeather (cityName: string, countryCode: string, unitType : UnitType = 'metric'): Promise<CurrentWeather> {
    const latAndLong = await this.#locationService.fetchLocationData(cityName, countryCode)
    return this.#weatherDataService.fetchCurrentWeatherData(latAndLong)
  }
}
