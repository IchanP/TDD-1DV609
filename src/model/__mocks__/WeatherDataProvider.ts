import { mockedCurrentWeatherValue } from '../../../tests/utils/testUtils.ts'

/**
 * Mock for WeatherDataProvider.
 */
export class WeatherDataProvider {
  /**
   * Mocked function to fetch weather data.
   *
   * @param {LocationData}  latAndLong - The location data to use to fetch.
   * @returns {object} - Returns mocked data.
   */
  fetchCurrentWeatherData (latAndLong: LocationData) {
    return mockedCurrentWeatherValue
  }
}
