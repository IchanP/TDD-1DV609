/**
 * Controls the DOM elements for the page.
 */
export class WeatherView {
  /**
   * Renders the current weather data in the DOM.
   *
   * @param {CurrentWeather} weatherData - The data to render.
   */
  renderCurrentWeatherData (weatherData: CurrentWeather) {
    // do nothing just for spying
  }

  /**
   * Mocked method for spying.
   *
   * @param {Error} errorToDisplay - Error to display in view
   */
  displayError (errorToDisplay : any) {
    // do nothing just for spying
  }

  /**
   * Returns nothing currently.
   *
   * @returns {string} - Returns nothing currently.
   */
  get currentSelectedTemperature (): string {
    return ''
  }
}
