// import { LocationProvider } from '../src/model/LocationProvider.ts'
import { jest } from '@jest/globals'
import 'dotenv/config'

describe('LocationProvider', () => {
  let locationProvider
  beforeAll(() => {
    console.log(process.env.API_KEY)
    locationProvider = new LocationProvider()
  })
  it('fetches and returns latitude and longitude of first item', () => {
    global.fetch = jest.fn(() => {
      Promise.resolve({
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
    })
    const city = 'Motala'
    const countryCode = 'SE'
    const expected = { lat: 58.5420395, lon: 15.041261 }
    const actual = locationProvider.fetchLocationData(city, countryCode)
    expect(fetch).toHaveBeenCalledWith(`http://api.openweathermap.org/geo/1.0/direct?q=${city},,${countryCode}&limit=5&appid=${process.env.API_KEY}`)
    expect(actual).toBe(expected)
  })
})
