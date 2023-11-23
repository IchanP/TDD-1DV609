import { SpiedFunction } from 'jest-mock'
import { WeatherFetcherFacade } from '../src/model/WeatherFetcherFacade'
import { jest } from '@jest/globals'
import { LocationService } from '../src/model/LocationService.ts'
import { WeatherDataService } from '../src/model/WeatherDataService.ts'

jest.mock('../src/model/LocationService.ts')
jest.mock('../src/model/WeatherDataService.ts')

let sut : WeatherFetcherFacade
let serviceLocationDataStub: SpiedFunction<(cityName: string, countryCode: string) => Promise<LocationData>>
let weatherServiceStub: SpiedFunction<(latAndLong: LocationData) => Promise<void>>
const city = 'Motala'
const countryCode = 'SE'

describe('Fetches longitude and latitude', () => {
  beforeAll(() => {
    sut = new WeatherFetcherFacade(new LocationService(), new WeatherDataService())
    serviceLocationDataStub = jest.spyOn(LocationService.prototype, 'fetchLocationData')
    weatherServiceStub = jest.spyOn(WeatherDataService.prototype, 'fetchWeatherData')
  })

  beforeEach(() => {
    sut.fetchWeatherData(city, countryCode)
  })

  it('should call LocationService', () => {
    expect(serviceLocationDataStub).toHaveBeenCalled()
  })

  it('should call WeatherDataService with LocationService return value', async () => {
    const expectedCallValue = await serviceLocationDataStub.mock.results[0].value
    expect(weatherServiceStub).toHaveBeenCalledWith(expectedCallValue)
  })
})
