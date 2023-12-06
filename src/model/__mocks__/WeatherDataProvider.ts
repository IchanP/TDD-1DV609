import { mockedCurrentWeatherValue } from '../../../tests/utils/testUtils.ts'

// REVIEW - This is a mock as it can be used to check whether fetchCurrentWeatherData is called as it is a real object.
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
    // REVIEW - This defines a predefined response to return when fetchCurrentWeatherData is called.
    // THus makign it a stub.
    return mockedCurrentWeatherValue
  }
}
