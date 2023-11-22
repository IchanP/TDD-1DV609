import { SpiedFunction } from 'jest-mock'
import { WeatherFetcherFacade } from '../src/model/WeatherFetcherFacade'
import { jest } from '@jest/globals'
import { LocationService } from '../src/model/LocationService.ts'
import { WeatherDataService } from '../src/model/WeatherDataService.ts'

jest.mock('../src/model/LocationService.ts')
jest.mock('../src/model/WeatherDataService.ts')

let sut : WeatherFetcherFacade
const city = 'Motala'
const countryCode = 'SE'
describe('Fetches longitude and latitude', () => {
  let serviceLocationDataStub: SpiedFunction<(cityName: string, countryCode: string) => Promise<LocationData>>
  let weatherServiceStub: any

  beforeAll(() => {
    sut = new WeatherFetcherFacade(new LocationService())
    serviceLocationDataStub = jest.spyOn(LocationService.prototype, 'fetchLocationData')
    weatherServiceStub = jest.spyOn(WeatherDataService.prototype, 'fetchWeatherData')
  })

  it('should call LocationService', () => {
    sut.fetchWeatherData(city, countryCode)
    expect(serviceLocationDataStub).toHaveBeenCalled()
  })

  it('should call WeatherDataService with LocationService return value', async () => {
    sut.fetchWeatherData(city, countryCode)
    const expectedCallValue = serviceLocationDataStub.mock.results[0].value
    console.log(expectedCallValue)
    expect(weatherServiceStub).toHaveBeenCalledWith(expectedCallValue)
  })
})
