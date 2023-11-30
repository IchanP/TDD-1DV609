import { jest } from '@jest/globals'
import { mockedCurrentWeather } from './utils/testUtils'
import { WeatherView } from '../src/View/WeatherView'

const sut = new WeatherView()
describe('WeatherView', () => {
  it('should have a field for the current weather image', () => {
    expect(sut.weatherImage).toBeDefined()
  })
})
