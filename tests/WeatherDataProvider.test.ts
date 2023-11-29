import { jest } from '@jest/globals'
import { WeatherDataProvider } from '../src/model/WeatherDataProvider.ts'
import { mockFetch } from './utils/testUtils'

describe('WeatherDataProvider', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('it should call fetch with correct url', async () => {
    const locationData : LocationData = { lat: 58.54, lon: 15.04 }
    const sut = new WeatherDataProvider()
    mockFetch({})
    const expected = `https://api.openweathermap.org/data/2.5/weather?lat=${locationData.lat}&lon=${locationData.lon}&appid=${process.env.API_KEY}`
    sut.fetchCurrentWeatherData(locationData)
    expect(global.fetch).toHaveBeenCalledWith(expected)
  })
})
