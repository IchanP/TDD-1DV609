import { WeatherController } from './Controller/WeatherController'
import { WeatherView } from './View/WeatherView'
import { LocationService } from './model/LocationService'
import { WeatherDataService } from './model/WeatherDataService'

const cityInput = document.getElementById('cityname-input') as HTMLInputElement
const countryCodeInput = document.getElementById('countrycode-input') as HTMLInputElement
const submitButton = document.getElementById('gofetch-button') as HTMLButtonElement
const currentWeatherImage = document.getElementById('weather-image') as HTMLImageElement
const locationService = new LocationService()
const dataService = new WeatherDataService()
const view = new WeatherView(currentWeatherImage)
const weatherController = new WeatherController(cityInput, countryCodeInput, locationService, dataService, view)

submitButton.addEventListener('click', async () => {
  await weatherController.fetchWeatherData()
})
