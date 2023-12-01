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
    const unitType = this.#convertUnitType()
    const currentWeather = await this.#tryFetchWeatherData(weatherFacade, unitType) as CurrentWeather
    this.#view.renderCurrentWeatherData(currentWeather)
  }

  /**
   * Tries to fetch weather data from the facade.
   *
   * @param {WeatherFetcherFacade} weatherFacade - The facade to fetch data from.
   * @param {UnitType} unitType - The unit type to use.
   * @returns {CurrentWeather} - Returns the current weather data.
   */
  async #tryFetchWeatherData (weatherFacade : WeatherFetcherFacade, unitType : UnitType) {
    let currentWeather
    try {
      currentWeather = await weatherFacade.fetchCurrentWeather(this.#cityInput.value, this.#countryCodeInput.value, unitType)
    } catch (err) {
      this.#view.displayError(err)
    }
    return currentWeather
  }

  /**
   * Converts the unit type to the correct format.
   *
   * @returns {string} - Returns the converted unit type.
   */
  #convertUnitType () : UnitType {
    let convertedUnitType : UnitType = 'imperial' // Default value required due to typescript
    if (this.#view.currentSelectedTemperature === 'Fahrenheit') {
      convertedUnitType = 'imperial'
    }
    return convertedUnitType
  }
}
