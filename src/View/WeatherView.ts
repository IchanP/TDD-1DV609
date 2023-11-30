/**
 * Controls the DOM elements for the page.
 */
export class WeatherView {
  #weatherImage: HTMLImageElement

  /**
   * Initializes the fields.
   *
   * @param {HTMLImageElement} weatherImage - The image element that displays the current weather.
   */
  constructor (weatherImage: HTMLImageElement) {
    this.#weatherImage = weatherImage
  }

  /**
   * Returns the currentweather image element.
   *
   * @returns {HTMLImageElement} - Returns the private field.
   */
  get weatherImage (): HTMLImageElement {
    return this.#weatherImage
  }

  /**
   * Renders the current weather data in the DOM.
   *
   * @param {CurrentWeather} weatherData - The data to render.
   */
  renderCurrentWeatherData (weatherData: CurrentWeather) {

  }
}
