import { jest } from '@jest/globals'
import { WeatherDataService } from '../src/model/WeatherDataService'
import { isCurrentWeather } from './utils/testUtils'
import { WeatherDataProvider } from '../src/model/WeatherDataProvider'

jest.mock('../src/model/WeatherDataProvider.ts')

let sut : WeatherDataService
const placeHolderLocationData = { lat: 0, lon: 0 }
describe('WeatherDataService', () => {
  beforeAll(() => {
    sut = new WeatherDataService()
  })
  it('fetchCurrentWeatherData should return a CurrentWeather object', () => {
    const actual = sut.fetchCurrentWeatherData(placeHolderLocationData)
    expect(isCurrentWeather(actual)).toBe(true)
  })
  it('fetchCUrrentWeatherData should call WeatherDataProvider with passed argument', () => {
    const mockedFetchCurrentWeatherData = jest.spyOn(WeatherDataProvider.prototype, 'fetchCurrentWeatherData')
    sut.fetchCurrentWeatherData(placeHolderLocationData)
    expect(mockedFetchCurrentWeatherData).toHaveBeenCalledWith(placeHolderLocationData)
  })
  it('fetcCurrentWeatherData should return values based on provider response', () => {
    const expected = { nameOfLocation: 'Motala', temperature: 265.47, description: 'scattered clouds', mainWeather: 'Clouds', pictureIcon: '03n' }
    const actual = sut.fetchCurrentWeatherData(placeHolderLocationData)
    expect(actual).toEqual(expected)
  })
  it('should have a way to add and change data provider', () => {
    expect(sut.addProvider).toBeDefined()
  })
  it('should have a provider field', () => {
    expect(sut.provider).toBeDefined()
  })
})
