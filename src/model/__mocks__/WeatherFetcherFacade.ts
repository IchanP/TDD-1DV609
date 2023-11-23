/* eslint-disable @typescript-eslint/no-unused-vars */

import { WeatherDataService } from '../WeatherDataService'

/**
 *
 */
export class WeatherFetcherFacade {
  static mockConstructor = jest.fn()
  #locationService: ILocationService
  /**
   * Initializes the location service field.
   *
   * @param {ILocationService} locationService - The location service to use.
   * @param {WeatherDataService} dataService - The data service to use.
   */
  constructor (locationService: ILocationService, dataService : WeatherDataService) {
    WeatherFetcherFacade.mockConstructor(locationService, dataService)
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

export interface MockWeatherFetcherFacade extends WeatherFetcherFacade {
  mockConstructor: jest.Mock;
}
