/**
 * Mocks the fetch function.
 *
 * @param {object} jsonData - The json data to be mocked.
 * @param {boolean} ok - Whether response is ok or not.
 */
export function mockFetch (jsonData: object, ok = true) {
  global.fetch = jest.fn(() =>
    // Typescript was complaining that global.fetch didn't match the mock, I did quick fix and now it works.
    Promise.resolve({
      ok,
      /**
       * Mocked json function.
       *
       * @returns {Promise} - Returns a promise for the json data.
       */
      json: () => Promise.resolve(jsonData),
      headers: new Headers(),
      redirected: false,
      status: 200,
      statusText: 'OK',
      type: 'default',
      url: '',
      bodyUsed: false,
      clone: jest.fn(),
      text: jest.fn(),
      blob: jest.fn(),
      arrayBuffer: jest.fn(),
      body: null,
      trailer: Promise.resolve(new Headers())
    } as unknown as Response)
  )
}

/**
 * Checks whether the passed variable conforms to CurrentWeather type.
 *
 * @param {object} toCheck - The object to check.
 * @returns {boolean} - Whether the object conforms to CurrentWeather type.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isCurrentWeather (toCheck: any) : boolean {
  return toCheck &&
           typeof toCheck.nameOfLocation === 'string' &&
           typeof toCheck.temperature === 'number' &&
           typeof toCheck.description === 'string' &&
           typeof toCheck.mainWeather === 'string' &&
           typeof toCheck.pictureIcon === 'string'
}
