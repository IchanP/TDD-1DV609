/**
 * Controls the DOM elements for the page.
 */
export class WeatherView {
  #currentWeatherImage: HTMLImageElement
  #currentWeatherTitle: HTMLHeadingElement

  /**
   * Initializes the fields.
   *
   * @param {HTMLImageElement} currentWeatherImage - The image element that displays the current weather.
   * @param currentWeatherTitle
   */
  constructor (currentWeatherImage: HTMLImageElement, currentWeatherTitle: HTMLHeadingElement) {
    this.#currentWeatherImage = currentWeatherImage
    this.#currentWeatherTitle = currentWeatherTitle
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
   * Returns the currentweather title elements text content.
   *
   * @returns {string} - Returns the value of the title element.
   */
  get currentWeatherTitle (): string {
    return this.#currentWeatherTitle.textContent || ''
  }

  /**
   * Renders the current weather data in the DOM.
   *
   * @param {CurrentWeather} weatherData - The data to render.
   */
  renderCurrentWeatherData (weatherData: CurrentWeather) {
    this.#currentWeatherImage.src = `https://openweathermap.org/img/wn/${weatherData.pictureIcon}@2x.png`
    this.#currentWeatherTitle.textContent = weatherData.mainWeather
  }
}
