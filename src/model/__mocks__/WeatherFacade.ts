/**
 * Mocks the WeatherFetcherFacade class
 */
export class WeatherFetcherFacade {
  #locationService : ILocationService
  /**
   * Initializes the location service field.
   *
   * @param {ILocationService} locationService - The location service to use.
   */
  constructor (locationService: ILocationService) {
    this.#locationService = locationService
  }

  /**
   * Does nothing, for now.
   *
   * @param {string} _cityName - The name of the city for which to fetch weather data.
   * @param {string} countryCode - The country code in ISO 3166 alpha-2 format https://www.iso.org/obp/ui/#search/code/
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  fetchWeatherData (_cityName: string, countryCode: string) {
    // Do nothing
  }
}
