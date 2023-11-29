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
