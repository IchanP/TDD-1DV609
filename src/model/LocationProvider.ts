import 'dotenv/config'

/**
 * Wrapper for the WeatherMap GeoLocation API
 */
export class LocationProvider {
  /**
   * Fetches location data from the OpenWeatherMap API.
   *
   * @param {string} cityName - The name of the city. Example: 'London'
   * @param {string} countryCode - The country code in ISO 3166 alpha-2 format https://www.iso.org/obp/ui/#search/code/
   * @returns {Promise<any>} - The
   */
  async fetchLocationData (cityName: string, countryCode: string): Promise<LocationData> {
    const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${cityName},,${countryCode}&limit=5&appid=${process.env.API_KEY}`)
    const data = await response.json()
    const locationData: LocationData = { lat: data[0].lat, lon: data[0].lon }
    return locationData
  }
}
