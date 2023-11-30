/**
 * Controls the DOM elements for the page.
 */
export class WeatherView {
  #currentWeatherImage: HTMLImageElement
  #currentWeatherTitle: HTMLHeadingElement
  #currentTemperature: HTMLHeadingElement
  #selectElement: HTMLSelectElement
  /**
   * Initializes the fields.
   *
   * @param {HTMLImageElement} currentWeatherImage - The image element that displays the current weather.
   * @param {HTMLHeadingElement} currentWeatherTitle - The title element that displays the current weather.
   * @param {HTMLHeadingElement} currentTemperature - The title element that displays the current temperature.
   * @param selectElement
   */
  constructor (currentWeatherImage: HTMLImageElement, currentWeatherTitle: HTMLHeadingElement, currentTemperature: HTMLHeadingElement,
    selectElement: HTMLSelectElement) {
    this.#currentWeatherImage = currentWeatherImage
    this.#currentWeatherTitle = currentWeatherTitle
    this.#currentTemperature = currentTemperature
    this.#selectElement = selectElement
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
   * Returns the current selected temperature style.
   *
   * @returns {string} - Returns the value of the temperature style.
   */
  get currentSelectedTemperature (): string {
    for (const option of this.#selectElement.options) {
      if (option.selected) {
        return option.value
      }
    }
    return ''
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
   * Returns the current temperature elements text content.
   *
   * @returns {string} - Returns the value of the temperature element.
   */
  get currentTemperature (): string {
    return this.#currentTemperature.textContent || ''
  }

  /**
   * Renders the current weather data in the DOM.
   *
   * @param {CurrentWeather} weatherData - The data to render.
   */
  renderCurrentWeatherData (weatherData: CurrentWeather) {
    this.#currentWeatherImage.src = `https://openweathermap.org/img/wn/${weatherData.pictureIcon}@2x.png`
    this.#currentWeatherTitle.textContent = weatherData.mainWeather
    this.#currentTemperature.textContent = `${weatherData.temperature}°F`
  }
}
