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
  })

  it('should have a field for the current weather image', () => {
    expect(sut.currentWeatherImage).toBeDefined()
  })
  it('should have a field for the current weather title', () => {
    expect(sut.currentWeatherTitle).toBeDefined()
  })
  it('should have a field for the current temperature', () => {
    expect(sut.currentTemperature).toBeDefined()
  })
  it('should have a field for the current selected temperature', () => {
    expect(sut.currentSelectedTemperature).toBeDefined()
  })
  it('should have a field for the error display', () => {
    expect(sut.errorMessage).toBeDefined()
  })

  it('currentSelectedTemperature should return the value of the selected temperature', () => {
    const sut = new WeatherView(currentWeatherImage, weatherTitle, currentTemperature, selectElement, errorMessage)
    const expeted = 'Celsius'
    const actual = sut.currentSelectedTemperature
    expect(actual).toBe(expeted)
    fahrenheitElement.selected = true
    const actual2 = sut.currentSelectedTemperature
    const expectedTwo = 'Fahrenheit'
    expect(actual2).toBe(expectedTwo)
  })

  it('renderCurrentWeatherData should set the src attribute of the currentWeatherImage to correct value', () => {
    const expected = `https://openweathermap.org/img/wn/${mockedCurrentWeather.pictureIcon}@2x.png`
    sut.renderCurrentWeatherData(mockedCurrentWeather)
    const actual = sut.currentWeatherImage.src
    expect(actual).toBe(expected)
  })
  it('renderCurrentWeatherData should set the textcontent of currentWeatherTitle to correct value', () => {
    const expected = mockedCurrentWeather.mainWeather
    sut.renderCurrentWeatherData(mockedCurrentWeather)
    const actual = sut.currentWeatherTitle
    expect(actual).toBe(expected)
  })
  it('renderCurrentWeatherData should set the textcontent of currentTemperature to correct value', () => {
    const expected = `${mockedCurrentWeather.temperature}°C`
    sut.renderCurrentWeatherData(mockedCurrentWeather)
    const actual = sut.currentTemperature
    expect(actual).toBe(expected)
  })
  it('renderCurrentWeatherData should set F or C depending on the selected temperature', () => {
    sut.renderCurrentWeatherData(mockedCurrentWeather)
    const expected = `${mockedCurrentWeather.temperature}°C`
    const actual = sut.currentTemperature
    expect(actual).toBe(expected)

    fahrenheitElement.selected = true

    sut.renderCurrentWeatherData(mockedCurrentWeather)
    const expected2 = `${mockedCurrentWeather.temperature}°F`
    const actual2 = sut.currentTemperature
    expect(actual2).toBe(expected2)
  })

  it('displayError should set the textcontent of element passed as errorMessage in constructor to the error message', () => {
    const sut = new WeatherView(currentWeatherImage, weatherTitle, currentTemperature, selectElement, errorMessage)
    const expected = 'Error message'
    sut.displayError(expected)
    const actual = errorMessage.textContent
    expect(actual).toBe(expected)
  })
})
