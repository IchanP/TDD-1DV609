import { jest } from '@jest/globals'
import { mockedCurrentWeather } from './utils/testUtils'
import { WeatherView } from '../src/View/WeatherView'

const currentWeatherImage = document.createElement('img')
let sut : WeatherView
describe('WeatherView', () => {
  beforeAll(() => {
    sut = new WeatherView(currentWeatherImage)
  })
  it('should have a field for the current weather image', () => {
    expect(sut.currentWeatherImage).toBeDefined()
  })
  it('renderCurrentWeatherData should set the src attribute of the currentWeatherImage to correct value', () => {
    const expected = `https://openweathermap.org/img/wn/${mockedCurrentWeather.pictureIcon}@2x.png`
    sut.renderCurrentWeatherData(mockedCurrentWeather)
    const actual = sut.currentWeatherImage.src
    expect(actual).toBe(expected)
  })
})
