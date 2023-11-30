/**
 * Controls the DOM elements for the page.
 */
export class WeatherView {
  #currentWeatherImage: HTMLImageElement

  /**
   * Initializes the fields.
   *
   * @param {HTMLImageElement} currentWeatherImage - The image element that displays the current weather.
   */
  constructor (currentWeatherImage: HTMLImageElement) {
    this.#currentWeatherImage = currentWeatherImage
  }

  /**
   * Returns the currentweather image element.
   *
   * @returns {HTMLImageElement} - Returns the private field.
   */
  get currentWeatherImage (): HTMLImageElement {
    return this.#currentWeatherImage
  }

  /**
   * Renders the current weather data in the DOM.
   *
   * @param {CurrentWeather} weatherData - The data to render.
   */
  renderCurrentWeatherData (weatherData: CurrentWeather) {

  }
}
