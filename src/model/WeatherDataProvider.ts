import { APIError } from './Errors/APIError'
import { APIKEY } from '../testingkey'

/**
 * A wrapper for fethcing weather data from the OpenWeatherMap API.
 */
export class WeatherDataProvider implements IWeatherProvider {
  /**
   * Fetches the weather data.
   *
   * @param {LocationData} latAndLong - The necessary latitude and longitude to fetch the weather data.
   * @param {string} unitType - The unit type to use when fetching the weather data.
   * @returns {Promise<any>} - The response from the API.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async fetchCurrentWeatherData (latAndLong: LocationData, unitType : UnitType = 'metric') : Promise<any> {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latAndLong.lat}&lon=${latAndLong.lon}&appid=${APIKEY}&units=${unitType}`)
    this.#validateFetch(response)
    const data = await response.json()
    return data
  }

  /**
   * Validates that the repsons from the API was OK.
   *
   * @param {Response} response - The response object.
   */
  #validateFetch (response: Response) : void {
    if (!response.ok) {
      throw new APIError()
    }
  }
}
