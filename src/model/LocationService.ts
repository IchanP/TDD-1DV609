import { NoCountryCodeError } from './Errors/NoCountryCodeError'
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
    if (!countryCode || countryCode.length !== 2) {
      throw new NoCountryCodeError()
    }
    const locationProvider = new LocationProvider(cityName, countryCode)
    locationProvider.fetchLocationData()
  }
}
