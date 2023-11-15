import { LocationService } from '../model/LocationService.ts'
import { WeatherFetcherFacade } from '../model/WeatherFetcherFacade.ts'

/**
 * Works as the controller between the view and the model.
 */
export class WeatherController {
  #submitButton: HTMLButtonElement
  #countryCodeInput: HTMLInputElement
  #cityInput: HTMLInputElement
  #locationService : ILocationService
  /**
   * Initializes the fields of the class.
   *
   * @param {HTMLInputElement} cityInputElement - The input element for the city name.
   * @param {HTMLInputElement} countryCodeInputElement - The input element for the country code.
   * @param {HTMLButtonElement} submitButton - The button element for submitting the form.
   * @param  locationService
   */
  constructor (cityInputElement : HTMLInputElement, countryCodeInputElement : HTMLInputElement, submitButton : HTMLButtonElement
    , locationService : ILocationService) {
    this.#cityInput = cityInputElement
    this.#countryCodeInput = countryCodeInputElement
    this.#submitButton = submitButton
    this.#locationService = locationService
  }

  /**
   * Returns the city input element.
   *
   * @returns {HTMLButtonElement} - Returns the private field.
   */
  get submitButton (): HTMLButtonElement {
    return this.#submitButton
  }

  /**
   * Returns the city input element.
   *
   * @returns {HTMLInputElement} - Returns the private field.
   */
  get countryCodeInput (): HTMLInputElement {
    return this.#countryCodeInput
  }

  /**
   * Returns the city input element.
   *
   * @returns {HTMLInputElement} - Returns the private field.
   */
  get cityInput (): HTMLInputElement {
    return this.#cityInput
  }

  /**
   * Returns the location service.
   *
   * @returns {ILocationService} - Returns the private field.
   */
  get locationService (): ILocationService {
    return this.#locationService
  }

  /**
   * Fetches weather data from openweatherapi.
   */
  async fetchWeatherData (): Promise<void> {
    const weatherFacade = new WeatherFetcherFacade(this.#locationService)
    weatherFacade.fetchWeatherData(this.#cityInput.value, this.#countryCodeInput.value)
  }
}
