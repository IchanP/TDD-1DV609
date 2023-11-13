/**
 * Error thrown when no country code is provided.
 */
export class NoCountryCodeError extends Error {
  /**
   * Constructs the error.
   */
  constructor () {
    super('No country code provided')
    this.name = 'NoCountryCodeError'
  }
}
