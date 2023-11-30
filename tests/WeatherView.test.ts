import { jest } from '@jest/globals'
import { mockedCurrentWeather, commonView } from './utils/testUtils'
import { WeatherView } from '../src/View/WeatherView'

const currentWeatherImage = document.createElement('img')
const weatherTitle = document.createElement('h1')
const currentTemperature = document.createElement('h1')
const selectElement = document.createElement('select')
const celsiusElement = document.createElement('option')
const errorMessage = document.createElement('p')
const fahrenheitElement = document.createElement('option')
celsiusElement.value = 'Celsius'
fahrenheitElement.value = 'Fahrenheit'
selectElement.appendChild(fahrenheitElement)
selectElement.appendChild(celsiusElement)
celsiusElement.selected = true

let sut : WeatherView
describe('WeatherView', () => {
  beforeAll(() => {
    sut = new WeatherView(currentWeatherImage, weatherTitle, currentTemperature, selectElement, errorMessage)
  })

  beforeEach(() => {
    celsiusElement.selected = true
    errorMessage.textContent = ''
  })

  verifyFieldDefined('currentWeatherImage')
  verifyFieldDefined('currentWeatherTitle')
  verifyFieldDefined('currentTemperature')
  verifyFieldDefined('currentSelectedTemperature')
  verifyFieldDefined('errorMessage')

  it('currentSelectedTemperature should return the value of the selected temperature', () => {
    setTemperatureUnit('Celsius')
    expect(sut.currentSelectedTemperature).toBe('Celsius')

    setTemperatureUnit('Fahrenheit')
    expect(sut.currentSelectedTemperature).toBe('Fahrenheit')
  })

  it('renderCurrentWeatherData should set correct values', () => {
    testRenderCurrentWeatherData('Celsius', `${mockedCurrentWeather.temperature}°C`)
    testRenderCurrentWeatherData('Fahrenheit', `${mockedCurrentWeather.temperature}°F`)
  })

  it('displayError should set the textcontent of errorMessage to the error message', () => {
    const error = new Error('Test error')
    sut.displayError(error)
    expect(errorMessage.textContent).toBe(error.message)
  })

  it('errorMessage should reset on successful fetch', () => {
    errorMessage.textContent = 'Test error'
    expect(sut.errorMessage).toBe('Test error')

    sut.renderCurrentWeatherData(mockedCurrentWeather)
    expect(sut.errorMessage).toBe('')
  })
})

/**
 * Verifies that the field is defined on the WeatherView.
 *
 * @param {K} fieldName - Key for WeatherView field.
 */
function verifyFieldDefined<K extends keyof WeatherView> (fieldName: K) {
  it(`should have a field for the ${fieldName}`, () => {
    expect(sut[fieldName]).toBeDefined()
  })
}

/**
 * Sets the temperature unit.
 *
 * @param {string} unit - The unit to set.
 */
function setTemperatureUnit (unit : string) {
  celsiusElement.selected = unit === 'Celsius'
  fahrenheitElement.selected = unit === 'Fahrenheit'
}

/**
 * Tests the renderCurrentWeatherData function.
 *
 * @param {string} unit - The unit to set.
 * @param {string} expectedTemp - The expected temperature.
 */
function testRenderCurrentWeatherData (unit :string, expectedTemp : string) {
  setTemperatureUnit(unit)
  sut.renderCurrentWeatherData(mockedCurrentWeather)
  expect(sut.currentWeatherImage.src).toBe(`https://openweathermap.org/img/wn/${mockedCurrentWeather.pictureIcon}@2x.png`)
  expect(sut.currentWeatherTitle).toBe(mockedCurrentWeather.mainWeather)
  expect(sut.currentTemperature).toBe(expectedTemp)
}
