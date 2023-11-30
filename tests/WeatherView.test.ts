import { jest } from '@jest/globals'
import { mockedCurrentWeather } from './utils/testUtils'
import { WeatherView } from '../src/View/WeatherView'

const currentWeatherImage = document.createElement('img')
const weatherTitle = document.createElement('h1')
const currentTemperature = document.createElement('h1')
let sut : WeatherView
describe('WeatherView', () => {
  beforeAll(() => {
    sut = new WeatherView(currentWeatherImage, weatherTitle, currentTemperature)
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

  it('currentSelectedTemperature should return the value of the selected temperature', () => {
    // TODO: Implement this test.
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
    const expected = `${mockedCurrentWeather.temperature}°F`
    sut.renderCurrentWeatherData(mockedCurrentWeather)
    const actual = sut.currentTemperature
    expect(actual).toBe(expected)
  })
})
