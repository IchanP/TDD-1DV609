import { WeatherController } from '../src/Controller/WeatherController.ts'
import { WeatherFetcherFacade } from '../src/model/WeatherFetcherFacade.ts'

const fetchWeatherDataMock = jest.spyOn(WeatherFetcherFacade.prototype, 'fetchWeatherData')
  .mockImplementation(() => Promise.resolve())

describe('WeatherController', () => {
  const cityInput = document.createElement('input')
  const countryCodeInput = document.createElement('input')
  const submitButton = document.createElement('button')

  it('constructor should accept three elements as argument', () => {
    const weatherController = new WeatherController(cityInput, countryCodeInput, submitButton)
    expect(weatherController).toBeDefined()
  })
  it('should have properties for cityInput, countryCodeInput and submitButton', () => {
    const weatherController = new WeatherController(cityInput, countryCodeInput, submitButton)
    expect(weatherController.cityInput).toBeDefined()
    expect(weatherController.countryCodeInput).toBeDefined()
    expect(weatherController.submitButton).toBeDefined()
  })

  it('should call fetchWeatherData on LocationService with values from cityInput and countryCodeInput', () => {
    const weatherController = new WeatherController(cityInput, countryCodeInput, submitButton)
    const city = 'Motala'
    const countryCode = 'SE'
    cityInput.value = city
    countryCodeInput.value = countryCode
    weatherController.fetchWeatherData()
    expect(fetchWeatherDataMock).toHaveBeenCalledWith(city, countryCode)
  })
})
