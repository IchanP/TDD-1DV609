/* eslint-disable import/first */
import { LocationService } from '../src/model/LocationService.ts'
import { InvalidCountryCodeError } from '../src/model/Errors/InvalidCountryCodeError.ts'
import { jest } from '@jest/globals'
import { LocationProvider } from '../src/model/LocationProvider.ts'

const validFetchLocationDataMock = jest.spyOn(LocationProvider.prototype, 'fetchFirstLatAndLong')
  .mockImplementation(() => {
    return { lat: 10.134123, lon: 42.41281380 }
  })

let sut
const city = 'AnyCity'
const countryCode = 'XX'
describe('LocationService', () => {
  beforeAll(() => {
    sut = new LocationService()
  })

  it('fetchlocationdata should throw an error if country code is not provided', async () => {
    await expectAsyncFetchThrowOnInvalidCountry()
  })

  it('fetchlocationdata should throw error if country code is longer than 2 characters', async () => {
    await expectAsyncFetchThrowOnInvalidCountry('XXX')
  })

  it('fetchlocationdata should throw error if country code is shorter than 2 characters', async () => {
    await expectAsyncFetchThrowOnInvalidCountry('X')
  })

  it('fetchlocationData should call fetchLocationData on LocationProvider', () => {
    sut.fetchLocationData(city, countryCode)
    expect(validFetchLocationDataMock).toHaveBeenCalled()
  })

  it('fetchlocationdata should return only 2 decimals on lat and long', async () => {
    const expected = { lat: 10.13, lon: 42.41 }
    const actual = await sut.fetchLocationData(city, countryCode)
    expect(actual).toEqual(expected)
  })
})

/**
 * Expects fetchLocationData to throw an InvalidCountryCodeError.
 *
 * @param {string} countryCode - The country code.
 */
async function expectAsyncFetchThrowOnInvalidCountry (countryCode) {
  expect(async () => await sut.fetchLocationData(city, countryCode)).rejects.toThrow(InvalidCountryCodeError)
}
