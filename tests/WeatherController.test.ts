import { WeatherController } from '../src/Controller/WeatherController.ts'
import { WeatherFetcherFacade } from '../src/model/WeatherFetcherFacade.ts'
import { LocationService } from '../src/model/LocationService.ts'
import { jest } from '@jest/globals'

jest.mock('../src/model/LocationService.ts')
jest.mock('../src/model/WeatherFetcherFacade.ts')

const cityInput = document.createElement('input')
const countryCodeInput = document.createElement('input')
const submitButton = document.createElement('button')
let sut : WeatherController

describe('WeatherController', () => {
  beforeAll(() => {
    sut = new WeatherController(cityInput, countryCodeInput, submitButton, new LocationService())
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
    const sut = new WeatherController(cityInput, countryCodeInput, submitButton, new LocationService())
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
})
