/**
 * Controls the DOM elements for the page.
 */
export class WeatherView {
  #currentWeatherImage: HTMLImageElement
  #currentWeatherTitle: HTMLHeadingElement
  #currentTemperature: HTMLHeadingElement
  #selectElement: HTMLSelectElement
  #errorElement: HTMLParagraphElement
  /**
   * Initializes the fields.
   *
   * @param {HTMLImageElement} currentWeatherImage - The image element that displays the current weather.
   * @param {HTMLHeadingElement} currentWeatherTitle - The title element that displays the current weather.
   * @param {HTMLHeadingElement} currentTemperature - The title element that displays the current temperature.
   * @param {HTMLSelectElement} selectElement - The select element that decides the current temperature style.
   * @param errorElement
   */
  constructor (currentWeatherImage: HTMLImageElement, currentWeatherTitle: HTMLHeadingElement, currentTemperature: HTMLHeadingElement,
    selectElement: HTMLSelectElement, errorElement: HTMLParagraphElement) {
    this.#currentWeatherImage = currentWeatherImage
    this.#currentWeatherTitle = currentWeatherTitle
    this.#currentTemperature = currentTemperature
    this.#selectElement = selectElement
    this.#errorElement = errorElement
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
    return this.#getSelectedTempValue()
  }

  /**
   * Returns the error message textcontent.
   *
   * @returns {string} - Returns the value of the error message element.
   */
  get errorMessage (): string {
    return this.#errorElement.textContent || ''
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
   * Displays the error in the DOM.
   *
   * @param {Error} errorToDisplay - Error to display in view.
   */
  displayError (errorToDisplay: any) {
    this.#errorElement.textContent = errorToDisplay.message
  }

  /**
   * Renders the current weather data in the DOM.
   *
   * @param {CurrentWeather} weatherData - The data to render.
   */
  renderCurrentWeatherData (weatherData: CurrentWeather) {
    this.#currentWeatherImage.src = `https://openweathermap.org/img/wn/${weatherData.pictureIcon}@2x.png`
    this.#currentWeatherTitle.textContent = weatherData.mainWeather
    if (this.#getSelectedTempValue() === 'Celsius') {
      this.#currentTemperature.textContent = `${weatherData.temperature}°C`
    } else {
      this.#currentTemperature.textContent = `${weatherData.temperature}°F`
    }
  }

  /**
   * Returns the value of the selected temperature.
   *
   * @returns {any} - Returns the value of the selected temperature.
   */
  #getSelectedTempValue () : any {
    for (const option of this.#selectElement.options) {
      if (option.selected) {
        return option.value
      }
    }
  }
}
