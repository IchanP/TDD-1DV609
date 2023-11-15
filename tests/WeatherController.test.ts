import { WeatherController } from '../src/Controller/WeatherController.ts'
import { WeatherFetcherFacade } from '../src/model/WeatherFetcherFacade.ts'

const fetchWeatherDataMock = jest.spyOn(WeatherFetcherFacade.prototype, 'fetchWeatherData')
  .mockImplementation(() => Promise.resolve())

const cityInput = document.createElement('input')
const countryCodeInput = document.createElement('input')
const submitButton = document.createElement('button')
let weatherController : WeatherController

describe('WeatherController', () => {
  beforeAll(() => {
    weatherController = new WeatherController(cityInput, countryCodeInput, submitButton)
  })

  it('constructor should accept three elements as argument', () => {
    expect(weatherController).toBeDefined()
  })
  it('should have properties for cityInput, countryCodeInput and submitButton', () => {
    expect(weatherController.cityInput).toBeDefined()
    expect(weatherController.countryCodeInput).toBeDefined()
    expect(weatherController.submitButton).toBeDefined()
  })

  it('should call fetchWeatherData on WeatherFetcherFacade with values from cityInput and countryCodeInput', () => {
    const city = 'Motala'
    const countryCode = 'SE'
    cityInput.value = city
    countryCodeInput.value = countryCode
    weatherController.fetchWeatherData()
    expect(fetchWeatherDataMock).toHaveBeenCalledWith(city, countryCode)
  })
})
