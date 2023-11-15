/**
 * Stub of LocationService.
 */
export class LocationService implements ILocationService {
  /**
   * Mocked function to fetch location data.
   *
   * @param {string} cityName - Name of city
   * @param {string} countryCode - CC code.
   * @returns {{lat: number, lon: number}} - Returns a stubbed object.
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  fetchLocationData (cityName: string, countryCode: string) {
    return Promise.resolve({ lat: 58.50, lon: 15.04 })
  }
}
