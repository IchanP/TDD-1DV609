import { WeatherController } from './Controller/WeatherController'
import { WeatherView } from './View/WeatherView'
import { LocationService } from './model/LocationService'
import { WeatherDataService } from './model/WeatherDataService'

const currentWeatherImage = document.getElementById('weather-image') as HTMLImageElement
const weatherTitle = document.getElementById('mainWeather') as HTMLHeadingElement
const currentTemperature = document.getElementById('temp') as HTMLHeadingElement
const view = new WeatherView(currentWeatherImage, weatherTitle, currentTemperature)

const cityInput = document.getElementById('cityname-input') as HTMLInputElement
const countryCodeInput = document.getElementById('countrycode-input') as HTMLInputElement
const locationService = new LocationService()
const dataService = new WeatherDataService()
const weatherController = new WeatherController(cityInput, countryCodeInput, locationService, dataService, view)

const submitButton = document.getElementById('gofetch-button') as HTMLButtonElement
submitButton.addEventListener('click', async () => {
  await weatherController.fetchWeatherData()
})
