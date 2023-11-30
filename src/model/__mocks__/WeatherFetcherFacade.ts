/* eslint-disable @typescript-eslint/no-unused-vars */

import { WeatherDataService } from '../WeatherDataService'
import { mockedCurrentWeather } from '../../../tests/utils/testUtils.ts'

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
   * @returns {CurrentWeather} - Returns a promise fetched from the DataService.
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async fetchCurrentWeather (_cityName: string, countryCode: string) : Promise<CurrentWeather> {
    return mockedCurrentWeather
  }
}

export interface MockWeatherFetcherFacade extends WeatherFetcherFacade {
  mockConstructor: jest.Mock;
}
