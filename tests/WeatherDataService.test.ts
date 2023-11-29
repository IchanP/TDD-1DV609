import { jest } from '@jest/globals'
import { WeatherDataService } from '../src/model/WeatherDataService'
import { isCurrentWeather } from './utils/testUtils'

let sut : WeatherDataService
describe('WeatherDataService', () => {
  beforeAll(() => {
    sut = new WeatherDataService()
  })
  it('fetchCurrentWeatherData should return a CurrentWeather object', () => {
    const placeHolderLocationData = { lat: 0, lon: 0 }
    const actual = sut.fetchCurrentWeatherData(placeHolderLocationData)
    expect(isCurrentWeather(actual)).toBe(true)
  })
})
