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
   * @returns {Promise<LocationData>} - Returns a promise for the latitude and longitude of the city, in 2.
   */
  async fetchLocationData (cityName: string, countryCode: string): Promise<LocationData> {
    this.#validateCountryCode(countryCode)
    const locationProvider = new LocationProvider(cityName, countryCode)
    const latAndLong = await locationProvider.fetchFirstLatAndLong()
    return this.#trimLatitudeAndLongitude(latAndLong)
  }

  /**
   * Trims the latitude and longitude to 2 decimal places.
   *
   * @param {LocationData} latAndLongToTrim - The latitude and longitude to trim.
   * @returns {LocationData} - Returns the LocationData with trimmed latitude and longitudes.
   */
  #trimLatitudeAndLongitude (latAndLongToTrim : LocationData) : LocationData {
    return {
      lat: Number(latAndLongToTrim.lat.toFixed(2)),
      lon: Number(latAndLongToTrim.lon.toFixed(2))
    }
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
