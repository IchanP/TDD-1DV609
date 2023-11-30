import { jest } from '@jest/globals'
import { WeatherDataProvider } from '../src/model/WeatherDataProvider.ts'
import { mockFetch, mockedCurrentWeatherValue } from './utils/testUtils'
import { APIError } from '../src/model/Errors/APIError.ts'
import { APIKEY } from '../src/testingkey.ts'

let sut : WeatherDataProvider
let locationData : LocationData
describe('WeatherDataProvider', () => {
  beforeAll(() => {
    sut = new WeatherDataProvider()
    locationData = { lat: 58.54, lon: 15.04 }
  })
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('it should call fetch with correct url', async () => {
    mockFetch({})
    const expected = `https://api.openweathermap.org/data/2.5/weather?lat=${locationData.lat}&lon=${locationData.lon}&appid=${APIKEY}&units=metric`
    sut.fetchCurrentWeatherData(locationData)
    expect(global.fetch).toHaveBeenCalledWith(expected)
  })

  it('fetchCurrentWeatherData should return fetched data', async () => {
    mockFetch(mockedCurrentWeatherValue)
    const expected = mockedCurrentWeatherValue
    const actual = await sut.fetchCurrentWeatherData(locationData)
    expect(actual).toEqual(expected)
  })

  it('fetchCurrentWeather should throw APIError if result is not ok', async () => {
    mockFetch({}, false)
    await expect(async () => await sut.fetchCurrentWeatherData(locationData)).rejects.toThrow(APIError)
  })
  it('OpenWeatherMap API should be called with imperial units if passed imperial argument', () => {
    mockFetch({})
    const expected = `https://api.openweathermap.org/data/2.5/weather?lat=${locationData.lat}&lon=${locationData.lon}&appid=${APIKEY}&units=imperial`
    sut.fetchCurrentWeatherData(locationData, 'imperial')
    expect(global.fetch).toHaveBeenCalledWith(expected)
  })
})
