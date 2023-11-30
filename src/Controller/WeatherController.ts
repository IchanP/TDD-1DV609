import { WeatherView } from '../View/WeatherView.ts'
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
  #weatherImage : HTMLImageElement
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
  constructor (cityInputElement : HTMLInputElement, countryCodeInputElement : HTMLInputElement, submitButton : HTMLButtonElement
    , weatherImage : HTMLImageElement, locationService : ILocationService, weatherDataService : WeatherDataService, view : WeatherView) {
    this.#cityInput = cityInputElement
    this.#countryCodeInput = countryCodeInputElement
    this.#weatherImage = weatherImage
    this.#submitButton = submitButton
    this.#locationService = locationService
    this.#dataService = weatherDataService
    this.#dataService.addProvider(new WeatherDataProvider())
    this.#view = view
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
   * Returns the view.
   *
   * @returns {WeatherView} - Returns the private field.
   */
  get view (): WeatherView {
    return this.#view
  }

  /**
   * Returns the weather image element.
   *
   * @returns {HTMLImageElement} - Returns the private field.
   */
  get weatherImage (): HTMLImageElement {
    return this.#weatherImage
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
    this.#setImageSource(currentWeather.pictureIcon)
  }

  /**
   * Sets the image source for the private field.
   *
   * @param {string} iconValue - The icon value.
   */
  #setImageSource (iconValue: string) : void {
    const url = `https://openweathermap.org/img/wn/${iconValue}@2x.png`
    this.#weatherImage.src = url
  }
}
