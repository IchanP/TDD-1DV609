import { jest } from '@jest/globals'
import { WeatherDataService } from '../src/model/WeatherDataService'
import { isCurrentWeather } from './utils/testUtils'

let sut : WeatherDataService
describe('WeatherDataService', () => {
  beforeAll(() => {
    sut = new WeatherDataService()
  })
  it('fetchCurrentWeatherData should return a CurrentWeather object', () => {
    const actual = sut.fetchCurrentWeatherData({ lat: 10.0, lon: 10.0 })
    expect(isCurrentWeather(actual)).toBe(true)
  })
})
