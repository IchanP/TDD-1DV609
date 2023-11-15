import { LocationProvider } from '../src/model/LocationProvider.ts'
import { jest } from '@jest/globals'
import 'dotenv/config'
import { APIError } from '../src/model/Errors/APIError.ts'
import { InvalidAPIParamaterError } from '../src/model/Errors/InvalidAPIParamaterError.ts'

const city = 'Motala'
const countryCode = 'SE'

describe('LocationProvider', () => {
  let sut

  beforeAll(() => {
    sut = new LocationProvider(city, countryCode)
  })

  it('fetches and returns latitude and longitude of first item', async () => {
    mockFetch([
      {
        name: 'Motala',
        local_names: {
          he: 'מוטלה',
          ru: 'Мутала',
          sv: 'Motala'
        },
        lat: 58.5420395,
        lon: 15.041261,
        country: 'SE'
      },
      {
        name: 'Motala kommun',
        local_names: {
          sv: 'Motala kommun'
        },
        lat: 58.55,
        lon: 15.166667,
        country: 'SE'
      },
      {
        name: 'Motala',
        lat: 58.9332511,
        lon: 15.6663872,
        country: 'SE'
      },
      {
        name: 'Motala',
        lat: 57.3593404,
        lon: 15.3290523,
        country: 'SE'
      }
    ], true)
    const expected = { lat: 58.5420395, lon: 15.041261 }
    const actual = await sut.fetchFirstLatAndLong()
    expectApiCall()
    expect(actual).toEqual(expected)
  })

  it('throws an APIError when ok status is false on fetch', () => {
    mockFetch({}, false)
    expect(async () => await sut.fetchFirstLatAndLong()).rejects.toThrow(APIError)
    expectApiCall()
  })

  it('throws an InvalidAPIParamaterError if the API returns an empty array', () => {
    mockFetch([])
    expect(async () => await sut.fetchFirstLatAndLong()).rejects.toThrow(InvalidAPIParamaterError)
    expectApiCall()
  })
})

/**
 * Checks that the API was called with the correct parameters.
 */
function expectApiCall () {
  expect(fetch).toHaveBeenCalledWith(`http://api.openweathermap.org/geo/1.0/direct?q=${city},,${countryCode}&limit=5&appid=${process.env.API_KEY}`)
}

/**
 * Mocks the fetch function.
 *
 * @param {object} jsonData - The json data to be mocked.
 * @param {boolean} ok - Whether response is ok or not.
 */
function mockFetch (jsonData, ok = true) {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok,
      /**
       * Mocks the json method of the response object.
       *
       * @returns {Promise} - The json data.
       */
      json: () => Promise.resolve(jsonData)
    })
  )
}
