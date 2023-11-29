import { WeatherDataProvider } from '../model/WeatherDataProvider.ts'
import { WeatherDataService } from '../model/WeatherDataService.ts'
import { WeatherFetcherFacade } from '../model/WeatherFetcherFacade.ts'

/**
 * Works as the controller between the view and the model.
 */
export class WeatherController {
  #submitButton: HTMLButtonElement
  #countryCodeInput: HTMLInputElement
  #cityInput: HTMLInputElement
  #locationService : ILocationService
  #dataService : WeatherDataService
  /**
   * Initializes the fields of the class.
   *
   * @param {HTMLInputElement} cityInputElement - The input element for the city name.
   * @param {HTMLInputElement} countryCodeInputElement - The input element for the country code.
   * @param {HTMLButtonElement} submitButton - The button element for submitting the form.
   * @param {ILocationServic} locationService - The location service to use.
   * @param {WeatherDataService} weatherDataService - The data service to use.
   */
  constructor (cityInputElement : HTMLInputElement, countryCodeInputElement : HTMLInputElement, submitButton : HTMLButtonElement
    , locationService : ILocationService, weatherDataService : WeatherDataService) {
    this.#cityInput = cityInputElement
    this.#countryCodeInput = countryCodeInputElement
    this.#submitButton = submitButton
    this.#locationService = locationService
    this.#dataService = weatherDataService
    this.#dataService.addProvider(new WeatherDataProvider())
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
   * Returns the data service the controller uses.
   *
   * @returns {WeatherDataService} - Returns the private field.
   */
  get dataService (): WeatherDataService {
    return this.#dataService
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
    const weatherFacade = new WeatherFetcherFacade(this.#locationService, this.#dataService)
    weatherFacade.fetchWeatherData(this.#cityInput.value, this.#countryCodeInput.value)
  }
}
