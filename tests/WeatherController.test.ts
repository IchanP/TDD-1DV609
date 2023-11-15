import { WeatherController } from '../src/Controller/WeatherController.ts'

describe('WeatherController', () => {
  const cityInput = document.createElement('input')
  const countryCodeInput = document.createElement('input')
  const submitButton = document.createElement('button')

  it('constructor should accept three elements as argument', () => {
    const weatherController = new WeatherController(cityInput, countryCodeInput, submitButton)
    expect(weatherController).toBeDefined()
  })
})
