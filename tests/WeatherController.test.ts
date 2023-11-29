import { WeatherController } from '../src/Controller/WeatherController.ts'
import { WeatherFetcherFacade } from '../src/model/WeatherFetcherFacade.ts'
import { MockWeatherFetcherFacade } from '../src/model/__mocks__/WeatherFetcherFacade.ts'
import { LocationService } from '../src/model/LocationService.ts'
import { jest } from '@jest/globals'
import { WeatherDataService } from '../src/model/WeatherDataService.ts'

jest.mock('../src/model/LocationService.ts')
jest.mock('../src/model/WeatherFetcherFacade.ts')

const cityInput = document.createElement('input')
const countryCodeInput = document.createElement('input')
const submitButton = document.createElement('button')
let sut : WeatherController

describe('WeatherController', () => {
  beforeAll(() => {
    sut = new WeatherController(cityInput, countryCodeInput, submitButton, new LocationService(), new WeatherDataService())
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

  it('should have an ILocationService property', () => {
    expect(sut.locationService).toBeDefined()
  })

  it('should call fetchWeatherData on WeatherFetcherFacade with values from cityInput and countryCodeInput', () => {
    const mockFetchWeatherData = jest.spyOn(WeatherFetcherFacade.prototype, 'fetchWeatherData')
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
})
