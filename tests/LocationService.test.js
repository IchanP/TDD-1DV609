/* eslint-disable import/first */
import { LocationService } from '../src/model/LocationService.ts'
import { NoCountryCodeError as InvalidCountryCodeError } from '../src/model/Errors/NoCountryCodeError.ts'
import { jest } from '@jest/globals'
import { LocationProvider } from '../src/model/LocationProvider.ts'

const fetchLocationDataMock = jest.spyOn(LocationProvider.prototype, 'fetchLocationData')
  .mockImplementation(() => {
    return { lat: 10.134123, lon: 42.41281380 }
  })

describe('LocationService', () => {
  let sut
  const city = 'AnyCity'
  const countryCode = 'XX'
  // Reinstating the LocationService class before each test
  beforeAll(() => {
    sut = new LocationService()
  })

  it('fetchlocationdata should throw an error if country code is not provided', () => {
    expect(() => sut.fetchLocationData(city)).toThrow(InvalidCountryCodeError)
  })

  it('fetchlocationdata should throw error if country code is longer than 2 characters', () => {
    expect(() => sut.fetchLocationData(city, 'XXX')).toThrow(InvalidCountryCodeError)
  })

  it('fetchlocationdata should throw error if country code is shorter than 2 characters', () => {
    expect(() => sut.fetchLocationData(city, 'X')).toThrow(InvalidCountryCodeError)
  })

  it('fetchlocationData should call fetchLocationData on LocationProvider', () => {
    sut.fetchLocationData(city, countryCode)
    expect(fetchLocationDataMock).toHaveBeenCalled()
  })

  /* it('fetchlocationdata should return only 2 decimals on lat and long', () => {
    const expected = { lat: 58.54, lon: 15.04 }
    const actual = sut.fetchLocationData(city, countryCode)
    expect(actual).toEqual(expected)
  }) */
})
