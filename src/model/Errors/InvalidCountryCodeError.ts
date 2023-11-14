/**
 * Error thrown when no country code is provided.
 */
export class InvalidCountryCodeError extends Error {
  /**
   * Constructs the error.
   */
  constructor () {
    super('No country code provided')
    this.name = 'InvalidCountryCodeError'
  }
}
