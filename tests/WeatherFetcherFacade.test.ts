import { SpiedFunction } from 'jest-mock'
import { WeatherFetcherFacade } from '../src/model/WeatherFetcherFacade'
import { jest } from '@jest/globals'

let sut : WeatherFetcherFacade
describe('Fetches longitude and latitude', () => {
  let serviceLocationDataStub: SpiedFunction<(cityName: string, countryCode: string) => Promise<{ lat: number; lon: number }>>
  beforeAll(() => {
    sut = new WeatherFetcherFacade(new LocationServiceStub())
    serviceLocationDataStub = jest.spyOn(LocationServiceStub.prototype, 'fetchLocationData')
  })
  it('should call LocationService', () => {
    const city = 'Motala'
    const countryCode = 'SE'
    sut.fetchWeatherData(city, countryCode)
    expect(serviceLocationDataStub).toHaveBeenCalled()
  })
})

/**
 * Stub of LocationService.
 */
class LocationServiceStub implements ILocationService {
  /**
   * Mocked function to fetch location data.
   *
   * @param {string} cityName - Name of city
   * @param {string} countryCode - CC code.
   * @returns {{lat: number, lon: number}} - Returns a stubbed object.
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  fetchLocationData (cityName: string, countryCode: string) {
    return Promise.resolve({ lat: 58.54, lon: 15.04 })
  }
}
