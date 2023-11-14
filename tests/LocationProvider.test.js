import { LocationProvider } from '../src/model/LocationProvider.ts'
import { jest } from '@jest/globals'
import 'dotenv/config'
import { APIError } from '../src/model/Errors/APIError.ts'

const city = 'Motala'
const countryCode = 'SE'

describe('LocationProvider', () => {
  let locationProvider

  beforeAll(() => {
    locationProvider = new LocationProvider()
  })

  it('fetches and returns latitude and longitude of first item', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        /**
         * Mocking the json method of the response object.
         *
         * @returns {Promise} - A promise that resolves to an array of objects.
         */
        json: () => Promise.resolve(
          [
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
          ]
        )
      })
    )
    const expected = { lat: 58.5420395, lon: 15.041261 }
    const actual = await locationProvider.fetchLocationData(city, countryCode)
    expectApiCall()
    expect(actual).toEqual(expected)
  })

  it('throws an APIError when ok status is false on fetch', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        /**
         * Mocks the json method of the response object.
         *
         * @returns {Promise} - Returns an empty promise.
         */
        json: () => Promise.resolve({})
      })
    )

    expect(async () => await locationProvider.fetchLocationData(city, countryCode)).rejects.toThrow(APIError)
    expectApiCall()
  })
})

/**
 * Checks that the API was called with the correct parameters.
 */
function expectApiCall () {
  expect(fetch).toHaveBeenCalledWith(`http://api.openweathermap.org/geo/1.0/direct?q=${city},,${countryCode}&limit=5&appid=${process.env.API_KEY}`)
}
