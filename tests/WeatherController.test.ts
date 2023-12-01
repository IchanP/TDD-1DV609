import { WeatherController } from '../src/Controller/WeatherController.ts'
import { WeatherFetcherFacade } from '../src/model/WeatherFetcherFacade.ts'
import { MockWeatherFetcherFacade } from '../src/model/__mocks__/WeatherFetcherFacade.ts'
import { LocationService } from '../src/model/LocationService.ts'
import { jest } from '@jest/globals'
import { WeatherDataService } from '../src/model/WeatherDataService.ts'
import { mockedCurrentWeather, commonView } from './utils/testUtils.ts'
import { WeatherView } from '../src/View/WeatherView.ts'
import { SpiedFunction } from 'jest-mock'

jest.mock('../src/model/LocationService.ts')
jest.mock('../src/model/WeatherFetcherFacade.ts')
jest.mock('../src/View/WeatherView.ts')

const cityInput = document.createElement('input')
const countryCodeInput = document.createElement('input')
let sut : WeatherController

describe('WeatherController', () => {
  let mockFetchWeatherData: SpiedFunction<(cityName: string, countryCode: string, unitType?: UnitType) => Promise<CurrentWeather>>
  let mockRenderCurrentWeather : SpiedFunction<(currentWeather: CurrentWeather) => void>
  let mockDisplayError: SpiedFunction<(errorToDisplay: any) => void>
  beforeAll(() => {
    sut = new WeatherController(cityInput, countryCodeInput, new LocationService(), new WeatherDataService(), commonView)
    mockFetchWeatherData = jest.spyOn(WeatherFetcherFacade.prototype, 'fetchCurrentWeather')
    mockRenderCurrentWeather = jest.spyOn(WeatherView.prototype, 'renderCurrentWeatherData')
    mockDisplayError = jest.spyOn(WeatherView.prototype, 'displayError')
  })
  beforeEach(() => {
    jest.clearAllMocks()
  })

  expectPropertyToBeDefined('cityInput')
  expectPropertyToBeDefined('countryCodeInput')
  expectPropertyToBeDefined('view')
  expectPropertyToBeDefined('locationService')

  it('constructor should accept three elements as argument', () => {
    expect(sut).toBeDefined()
  })

  it('should call fetchWeatherData on WeatherFetcherFacade with values from cityInput and countryCodeInput', () => {
    const city = 'Motala'
    const countryCode = 'SE'
    cityInput.value = city
    countryCodeInput.value = countryCode
    sut.fetchWeatherData()
    expect(mockFetchWeatherData).toHaveBeenCalledWith(city, countryCode, 'imperial')
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

  it('fetchWeatherData should call view with return value from facade', async () => {
    await sut.fetchWeatherData()
    expect(mockRenderCurrentWeather).toHaveBeenCalledWith(mockedCurrentWeather)
  })

  it('fetchWeatherData should call displayError on view with error if facade throws error', async () => {
    const mockedError = new Error()
    mockFetchWeatherData.mockImplementationOnce(async (cityName: string, countryCode: string) => {
      throw mockedError
      // eslint-disable-next-line no-unreachable
      return mockedCurrentWeather
    })
    await sut.fetchWeatherData()
    expect(mockDisplayError).toHaveBeenCalledWith(mockedError)
  })

  it('fetchWeatherData should call fetchCurrentWeather on facade with imperial if currentSelectedTemperature on view is Fahrenheit', async () => {
    jest.spyOn(WeatherView.prototype, 'currentSelectedTemperature', 'get').mockReturnValue('Fahrenheit')
    await sut.fetchWeatherData()
    expect(mockFetchWeatherData).toHaveBeenCalledWith(cityInput.value, countryCodeInput.value, 'imperial')
  })

  it('fetchWeatherData should call fetchCurrentWeather on facade with metric if currentSelectedTemperature on view is Celsius', async () => {
    jest.spyOn(WeatherView.prototype, 'currentSelectedTemperature', 'get').mockReturnValue('Celsius')
    await sut.fetchWeatherData()
    expect(mockFetchWeatherData).toHaveBeenCalledWith(cityInput.value, countryCodeInput.value, 'metric')
  })
})

/**
 * Verifies that the property is defined on the WeatherController.
 *
 * @param {K} property - The property to check.
 */
function expectPropertyToBeDefined<K extends keyof WeatherController> (property : K) {
  it(`should have a property for the ${property}`, () => {
    expect(sut[property]).toBeDefined()
  })
}
