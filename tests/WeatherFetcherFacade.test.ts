import { SpiedFunction } from 'jest-mock'
import { WeatherFetcherFacade } from '../src/model/WeatherFetcherFacade'
import { jest } from '@jest/globals'
import { LocationService } from '../src/model/LocationService.ts'

jest.mock('../src/model/LocationService.ts')

let sut : WeatherFetcherFacade
describe('Fetches longitude and latitude', () => {
  let serviceLocationDataStub: SpiedFunction<(cityName: string, countryCode: string) => Promise<{ lat: number; lon: number }>>
  beforeAll(() => {
    sut = new WeatherFetcherFacade(new LocationService())
    serviceLocationDataStub = jest.spyOn(LocationService.prototype, 'fetchLocationData')
  })
  it('should call LocationService', () => {
    const city = 'Motala'
    const countryCode = 'SE'
    sut.fetchWeatherData(city, countryCode)
    expect(serviceLocationDataStub).toHaveBeenCalled()
  })
})
