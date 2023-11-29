import { APIError } from './Errors/APIError'

/**
 * A wrapper for fethcing weather data from the OpenWeatherMap API.
 */
export class WeatherDataProvider {
  /**
   * Fetches the weather data.
   *
   * @param {LocationData} latAndLong - The necessary latitude and longitude to fetch the weather data.
   * @returns {Promise<any>} - The response from the API.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async fetchCurrentWeatherData (latAndLong: LocationData) : Promise<any> {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latAndLong.lat}&lon=${latAndLong.lon}&appid=${process.env.API_KEY}`)
    if (!response.ok) {
      throw new APIError()
    }
    const data = await response.json()
    return data
  }
}
