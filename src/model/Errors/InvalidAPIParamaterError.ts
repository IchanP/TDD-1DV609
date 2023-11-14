/**
 * Error for when an invalid API paramater is passed.
 */
export class InvalidAPIParamaterError extends Error {
  /**
   * Constructs the error.
   */
  constructor () {
    super('Invalid API paramater returned no result.')
    this.name = 'InvalidAPIParamaterError'
  }
}
