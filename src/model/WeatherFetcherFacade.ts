/**
 * Acts as a facade coordinating the weather fetching process.
 */
export class WeatherFetcherFacade {
  #locationService : ILocationService
  /**
   * Initializes the location service field.
   *
   * @param {ILocationService} locationService - The location service to use.
   */
  constructor (locationService : ILocationService) {
    this.#locationService = locationService
  }

  /**
   * Fetches the weather data for a city.
   *
   * @param {string} cityName - The name of the city for which to fetch weather data.
   * @param {string} countryCode - The country code in ISO 3166 alpha-2 format https://www.iso.org/obp/ui/#search/code/
   */
  fetchWeatherData (cityName: string, countryCode: string): any {
    this.#locationService.fetchLocationData(cityName, countryCode)
  }
}
