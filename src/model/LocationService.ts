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
  async fetchLocationData (cityName: string, countryCode: string): Promise<LocationData> {
    this.#validateCountryCode(countryCode)
    const locationProvider = new LocationProvider(cityName, countryCode)
    const latAndLong = await locationProvider.fetchLocationData()
    latAndLong.lat = Number(latAndLong.lat.toFixed(2))
    latAndLong.lon = Number(latAndLong.lon.toFixed(2))
    return latAndLong
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
