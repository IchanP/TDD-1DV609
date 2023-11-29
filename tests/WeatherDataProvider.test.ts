import { jest } from '@jest/globals'
import { WeatherDataProvider } from '../src/model/WeatherDataProvider.ts'
import { mockFetch } from './utils/testUtils'

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
    const expected = `https://api.openweathermap.org/data/2.5/weather?lat=${locationData.lat}&lon=${locationData.lon}&appid=${process.env.API_KEY}`
    sut.fetchCurrentWeatherData(locationData)
    expect(global.fetch).toHaveBeenCalledWith(expected)
  })

  it('fetchCurrentWeatherData should return fetched data', async () => {
    mockFetch({
      coord: {
        lon: 15.04,
        lat: 58.54
      },
      weather: [
        {
          id: 802,
          main: 'Clouds',
          description: 'scattered clouds',
          icon: '03n'
        }
      ],
      base: 'stations',
      main: {
        temp: 265.47,
        feels_like: 265.47,
        temp_min: 263.61,
        temp_max: 266.96,
        pressure: 989,
        humidity: 74
      },
      visibility: 2374,
      wind: {
        speed: 0.45,
        deg: 187,
        gust: 0.89
      },
      clouds: {
        all: 25
      },
      dt: 1701269409,
      sys: {
        type: 2,
        id: 2011172,
        country: 'SE',
        sunrise: 1701242333,
        sunset: 1701267449
      },
      timezone: 3600,
      id: 2690960,
      name: 'Motala',
      cod: 200
    })
    const expected = {
      coord: {
        lon: 15.04,
        lat: 58.54
      },
      weather: [
        {
          id: 802,
          main: 'Clouds',
          description: 'scattered clouds',
          icon: '03n'
        }
      ],
      base: 'stations',
      main: {
        temp: 265.47,
        feels_like: 265.47,
        temp_min: 263.61,
        temp_max: 266.96,
        pressure: 989,
        humidity: 74
      },
      visibility: 2374,
      wind: {
        speed: 0.45,
        deg: 187,
        gust: 0.89
      },
      clouds: {
        all: 25
      },
      dt: 1701269409,
      sys: {
        type: 2,
        id: 2011172,
        country: 'SE',
        sunrise: 1701242333,
        sunset: 1701267449
      },
      timezone: 3600,
      id: 2690960,
      name: 'Motala',
      cod: 200
    }
    const actual = await sut.fetchCurrentWeatherData(locationData)
    expect(actual).toEqual(expected)
  })
})
