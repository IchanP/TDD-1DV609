/**
 * Works as the controller between the view and the model.
 */
export class WeatherController {
  submitButton: HTMLButtonElement
  countryCodeInput: HTMLInputElement
  cityInput: HTMLInputElement
  /**
   * Initializes the fields of the class.
   *
   * @param {HTMLInputElement} cityInputElement - The input element for the city name.
   * @param {HTMLInputElement} countryCodeInputElement - The input element for the country code.
   * @param {HTMLButtonElement} submitButton - The button element for submitting the form.
   */
  constructor (cityInputElement : HTMLInputElement, countryCodeInputElement : HTMLInputElement, submitButton : HTMLButtonElement) {
    this.cityInput = cityInputElement
    this.countryCodeInput = countryCodeInputElement
    this.submitButton = submitButton
  }
}
