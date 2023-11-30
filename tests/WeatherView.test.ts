import { jest } from '@jest/globals'
import { mockedCurrentWeather } from './utils/testUtils'
import { WeatherView } from '../src/View/WeatherView'

const currentWeatherImage = document.createElement('img')
const sut = new WeatherView(currentWeatherImage)
describe('WeatherView', () => {
  it('should have a field for the current weather image', () => {
    expect(sut.currentWeatherImage).toBeDefined()
  })
})
