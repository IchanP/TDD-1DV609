import { WeatherController } from '../src/Controller/WeatherController.ts'
import { WeatherFetcherFacade } from '../src/model/WeatherFetcherFacade.ts'
import { MockWeatherFetcherFacade } from '../src/model/__mocks__/WeatherFetcherFacade.ts'
import { LocationService } from '../src/model/LocationService.ts'
import { jest } from '@jest/globals'
import { WeatherDataService } from '../src/model/WeatherDataService.ts'
import { mockedCurrentWeather } from './utils/testUtils.ts'
import { WeatherView } from '../src/View/WeatherView.ts'

jest.mock('../src/model/LocationService.ts')
jest.mock('../src/model/WeatherFetcherFacade.ts')
jest.mock('../src/view/WeatherView.ts')

const cityInput = document.createElement('input')
const countryCodeInput = document.createElement('input')
const submitButton = document.createElement('button')
const weatherImage = document.createElement('img')
let sut : WeatherController

describe('WeatherController', () => {
  beforeAll(() => {
    sut = new WeatherController(cityInput, countryCodeInput, submitButton, weatherImage, new LocationService(), new WeatherDataService(), new WeatherView())
  })
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('constructor should accept three elements as argument', () => {
    expect(sut).toBeDefined()
  })
  it('should have properties for cityInput, countryCodeInput and submitButton', () => {
    expect(sut.cityInput).toBeDefined()
    expect(sut.countryCodeInput).toBeDefined()
    expect(sut.submitButton).toBeDefined()
  })
  it('should have property for weather image', () => {
    expect(sut.weatherImage).toBeDefined()
  })
  it('should have a property for the view', () => {
    expect(sut.view).toBeDefined()
  })

  it('should have an ILocationService property', () => {
    expect(sut.locationService).toBeDefined()
  })

  it('should call fetchWeatherData on WeatherFetcherFacade with values from cityInput and countryCodeInput', () => {
    const mockFetchWeatherData = jest.spyOn(WeatherFetcherFacade.prototype, 'fetchCurrentWeather')
    const city = 'Motala'
    const countryCode = 'SE'
    cityInput.value = city
    countryCodeInput.value = countryCode
    sut.fetchWeatherData()
    expect(mockFetchWeatherData).toHaveBeenCalledWith(city, countryCode)
  })

  it('fetchWeatherData should construct WeatherFetcherFacade with own properties', () => {
    // Necessary casting to spy on the constructor.
    const mockedWeatherFetcherFacade = WeatherFetcherFacade as unknown as MockWeatherFetcherFacade

    sut.fetchWeatherData()

    const locationField = sut.locationService
    const dataField = sut.dataService
    const firstArgument = mockedWeatherFetcherFacade.mockConstructor.mock.calls[0][0]
    const secondArgument = mockedWeatherFetcherFacade.mockConstructor.mock.calls[0][1]

    const expected = (locationField === firstArgument) && (dataField === secondArgument)
    expect(expected).toBeTruthy()
  })

  it('fetchWeatherData should set weatherImage src to the returned weather image', async () => {
    await sut.fetchWeatherData()
    const expected = `https://openweathermap.org/img/wn/${mockedCurrentWeather.pictureIcon}@2x.png`
    const actual = sut.weatherImage.src
    expect(actual).toEqual(expected)
  })

  it('fetchWeatherData should call view with return value from facade', () => {
    const mockView = jest.spyOn(WeatherView.prototype, 'renderCurrentWeatherData')
    sut.fetchWeatherData()
    expect(mockView).toHaveBeenCalledWith(mockedCurrentWeather)
  })
})
