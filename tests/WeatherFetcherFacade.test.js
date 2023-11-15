import { WeatherFetcherFacade } from '../src/model/WeatherFetcherFacade'
import { jest } from '@jest/globals'

let sut
describe('Fetches longitude and latitude', () => {
  let serviceLocationDataStub
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
class LocationServiceStub {
  /**
   * Mocked function to fetch location data.
   *
   * @returns {{lat: number, lon: number}} - Returns a stubbed object.
   */
  fetchLocationData () {
    return { lat: 58.54, lon: 15.04 }
  }
}
