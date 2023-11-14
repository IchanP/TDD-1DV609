/* eslint-disable import/first */
import { LocationService } from '../src/model/LocationService.ts'
import { InvalidCountryCodeError } from '../src/model/Errors/InvalidCountryCodeError.ts'
import { jest } from '@jest/globals'
import { LocationProvider } from '../src/model/LocationProvider.ts'

const fetchLocationDataMock = jest.spyOn(LocationProvider.prototype, 'fetchLocationData')
  .mockImplementation(() => {
    return { lat: 10.134123, lon: 42.41281380 }
  })

let sut
const city = 'AnyCity'
const countryCode = 'XX'
describe('LocationService', () => {
  // Reinstating the LocationService class before each test
  beforeAll(() => {
    sut = new LocationService()
  })

  it('fetchlocationdata should throw an error if country code is not provided', async () => {
    await expectAsyncFetchThrow()
  })

  it('fetchlocationdata should throw error if country code is longer than 2 characters', async () => {
    await expectAsyncFetchThrow('XXX')
  })

  it('fetchlocationdata should throw error if country code is shorter than 2 characters', async () => {
    await expectAsyncFetchThrow('X')
  })

  it('fetchlocationData should call fetchLocationData on LocationProvider', () => {
    sut.fetchLocationData(city, countryCode)
    expect(fetchLocationDataMock).toHaveBeenCalled()
  })

  it('fetchlocationdata should return only 2 decimals on lat and long', async () => {
    const expected = { lat: 10.13, lon: 42.41 }
    const actual = await sut.fetchLocationData(city, countryCode)
    console.log(actual)
    expect(actual).toEqual(expected)
  })
})

/**
 * Expects fetchLocationData to throw an InvalidCountryCodeError.
 *
 * @param {string} countryCode - The country code.
 */
async function expectAsyncFetchThrow (countryCode) {
  expect(async () => await sut.fetchLocationData(city, countryCode)).rejects.toThrow(InvalidCountryCodeError)
}
