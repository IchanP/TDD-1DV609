/* eslint-disable import/first */
import { LocationService } from '../src/model/LocationService.ts'
import { InvalidCountryCodeError } from '../src/model/Errors/InvalidCountryCodeError.ts'
import { jest } from '@jest/globals'
import { LocationProvider } from '../src/model/LocationProvider.ts'

// Initial mock implementation of fetchFirstLatAndLong for 4th test case in this file.
let validFetchLocationDataMock = mockFetchFirstLatAndLong(10.134123, 42.41281380)

let sut
const city = 'AnyCity'
const countryCode = 'XX'
describe('LocationServic fetchLocationData error and calls', () => {
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
})

describe('LocationService fetchLocationData expected return values', () => {
  beforeEach(() => {
    // Clear it before each test case as the return value needs to be remocked for the different values.
    validFetchLocationDataMock.mockClear()
  })

  it('should return 2 decimals on positive with 2 wholes ', async () => {
    validFetchLocationDataMock = mockFetchFirstLatAndLong(10.134123, 42.41281380)
    assertFetchLocationDataReturnsCorrectValues(10.13, 42.41)
  })

  it('should return 2 decimals on negatives with 2 wholes', async () => {
    validFetchLocationDataMock = mockFetchFirstLatAndLong(-10.134123, -42.41281380)
    assertFetchLocationDataReturnsCorrectValues(-10.13, -42.41)
  })

  it('should return 2 decimals on negatives with 3 wholes', async () => {
    validFetchLocationDataMock = mockFetchFirstLatAndLong(-100.134123, -100.41281380)
    assertFetchLocationDataReturnsCorrectValues(-100.13, -100.41)
  })

  it('should return 2 decimals on positives with 3 wholes', async () => {
    validFetchLocationDataMock = mockFetchFirstLatAndLong(100.134123, 100.41281380)
    assertFetchLocationDataReturnsCorrectValues(100.13, 100.41)
  })

  it('should return 2 decimals with mixed negatives and positives', async () => {
    validFetchLocationDataMock = mockFetchFirstLatAndLong(-100.134123, 100.41281380)
    assertFetchLocationDataReturnsCorrectValues(-100.13, 100.41)
  })
})

/**
 * Mocks the fetch call in LocationProvider.
 *
 * @param {number} latitude - Should be a floating point number.
 * @param {number} longitude - Should be a floating point number.
 * @returns {Function} - Returns a mocked function.
 */
function mockFetchFirstLatAndLong (latitude, longitude) {
  return jest.spyOn(LocationProvider.prototype, 'fetchFirstLatAndLong')
    .mockImplementation(() => {
      return { lat: latitude, lon: longitude }
    })
}

/**
 * Expects fetchLocationData to throw an InvalidCountryCodeError.
 *
 * @param {string} countryCode - The country code.
 */
async function expectAsyncFetchThrowOnInvalidCountry (countryCode) {
  expect(async () => await sut.fetchLocationData(city, countryCode)).rejects.toThrow(InvalidCountryCodeError)
}

/**
 * Asserts that fetchLocationData returns the correct values.
 *
 * @param {number} latitude - The latitude.
 * @param {number} longitude - The longitude.
 */
async function assertFetchLocationDataReturnsCorrectValues (latitude, longitude) {
  const expected = { lat: latitude, lon: longitude }
  const actual = await sut.fetchLocationData(city, countryCode)
  expect(actual).toEqual(expected)
}
