import { mockedCurrentWeather } from '../../../tests/utils/testUtils.ts'

/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * Stub for WeatherDataService.
 */
export class WeatherDataService {
  /**
   * Mocked function to fetch weather data.
   *
   * @param {LocationData}  latAndLong - The location data to use to fetch.
   * @returns {CurrentWeather} - Returns mocked data.
   */
  async fetchCurrentWeatherData (latAndLong: LocationData) : Promise<CurrentWeather> {
    return mockedCurrentWeather
  }
}
