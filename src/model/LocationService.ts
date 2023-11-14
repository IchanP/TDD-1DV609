import { InvalidCountryCodeError } from './Errors/InvalidCountryCodeError'
import { LocationProvider } from './LocationProvider'

/**
 * Bridge between the UI and the LocationFetcher class.
 */
export class LocationService {
  /**
   * Fetches location data from the OpenWeatherMap API.
   *
   * @param {string} cityName - The name of the city. Example: 'London'
   * @param {string} countryCode - The country code in ISO 3166 alpha-2 format https://www.iso.org/obp/ui/#search/code/
   */
  fetchLocationData (cityName: string, countryCode: string): any {
    this.#validateCountryCode(countryCode)
    const locationProvider = new LocationProvider(cityName, countryCode)
    locationProvider.fetchLocationData()
  }

  /**
   * Validates that the passed string is 2 characters long.
   *
   * @param {string} countryCode - Must be a string of 2 characters.
   * @throws {NoCountryCodeError} - Throws an error if the string is not 2 characters long.
   */
  #validateCountryCode (countryCode: string): void {
    if (!countryCode || countryCode.length !== 2) {
      throw new InvalidCountryCodeError()
    }
  }
}
