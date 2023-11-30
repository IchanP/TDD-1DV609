import { WeatherView } from '../View/WeatherView.ts'
import { WeatherDataProvider } from '../model/WeatherDataProvider.ts'
import { WeatherDataService } from '../model/WeatherDataService.ts'
import { WeatherFetcherFacade } from '../model/WeatherFetcherFacade.ts'

/**
 * Works as the controller between the view and the model.
 */
export class WeatherController {
  #countryCodeInput: HTMLInputElement
  #cityInput: HTMLInputElement
  #locationService : ILocationService
  #dataService : WeatherDataService
  #view : WeatherView
  /**
   * Initializes the fields of the class.
   *
   * @param {HTMLInputElement} cityInputElement - The input element for the city name.
   * @param {HTMLInputElement} countryCodeInputElement - The input element for the country code.
   * @param {HTMLButtonElement} submitButton - The button element for submitting the form.
   * @param {HTMLImageElement} weatherImage - The image element to use.
   * @param {ILocationServic} locationService - The location service to use.
   * @param {WeatherDataService} weatherDataService - The data service to use.
   * @param {WeatherView} view - The view to use.
   */
  constructor (cityInputElement : HTMLInputElement, countryCodeInputElement : HTMLInputElement, locationService : ILocationService, weatherDataService : WeatherDataService, view : WeatherView) {
    this.#cityInput = cityInputElement
    this.#countryCodeInput = countryCodeInputElement
    this.#locationService = locationService
    this.#dataService = weatherDataService
    this.#dataService.addProvider(new WeatherDataProvider())
    this.#view = view
  }

  /**
   * Returns the view.
   *
   * @returns {WeatherView} - Returns the private field.
   */
  get view (): WeatherView {
    return this.#view
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
    const currentWeather = await weatherFacade.fetchCurrentWeather(this.#cityInput.value, this.#countryCodeInput.value)
    this.#view.renderCurrentWeatherData(currentWeather)
  }
}
