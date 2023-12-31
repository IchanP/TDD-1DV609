import { APIError } from './Errors/APIError'
import { InvalidAPIParamaterError } from './Errors/InvalidAPIParamaterError'
import { APIKEY } from '../testingkey'

/**
 * Wrapper for the WeatherMap GeoLocation API
 */
export class LocationProvider {
  #cityName: string
  #countryCode: string
  /**
   * Initializes fields of the class.
   *
   * @param {string} cityName - The name of the city for which to fetch location data.
   * @param {string} countryCode - The country code in ISO 3166 alpha-2 format https://www.iso.org/obp/ui/#search/code/
   */
  constructor (cityName: string, countryCode: string) {
    this.#cityName = cityName
    this.#countryCode = countryCode
  }

  /**
   * Fetches location data from the OpenWeatherMap API.
   *
   * @returns {Promise<LocationData>} - The latitude and longitude of the city.
   */
  async fetchFirstLatAndLong (): Promise<LocationData> {
    const data = await this.#fetchCityData()
    return this.#extractLatandLon(data, 0)
  }

  /**
   * Fetches city data from the API.
   *
   * @throws {InvalidAPIParamaterError} - Throws an error if the API returns no results.
   * @returns {Promise<Array<CityApiResponse>>} - The response data from the API.
   */
  async #fetchCityData (): Promise<Array<CityApiResponse>> {
    const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${this.#cityName},,${this.#countryCode}&limit=5&appid=${APIKEY}`)
    this.#validateResponse(response)
    const data : Array<CityApiResponse> = await response.json()
    this.#validateResultsExist(data)
    return data
  }

  /**
   * Checks whether the response was ok.
   *
   * @param {Response} response - The response from the API call.
   * @throws {APIError} - Throws an error if the response was not ok.
   */
  #validateResponse (response: Response): void {
    if (!response.ok) {
      throw new APIError()
    }
  }

  /**
   * Validates that the results exist in the data array.
   *
   * @param {Array<CityApiResponse>} data - The data returned from the API.
   * @throws {InvalidAPIParamaterError} - Throws an error if the results do not exist.
   */
  #validateResultsExist (data: Array<CityApiResponse>) {
    if (data.length === 0) {
      throw new InvalidAPIParamaterError()
    }
  }

  /**
   * Extracts the latitude and longitude of the indexed city from the data array.
   *
   * @param {Array<object>} data - An array of objects containing city data. Example structure can be found here:
   * https://openweathermap.org/api/geocoding-api#direct_name_example
   * @param {number} index - The index of the city in the data array.
   * @returns {LocationData} - The latitude and longitude of the city.
   */
  #extractLatandLon (data: Array<CityApiResponse>, index: number): LocationData {
    return { lat: data[index].lat, lon: data[index].lon }
  }
}
