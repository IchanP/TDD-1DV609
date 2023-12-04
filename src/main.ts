import { WeatherController } from './Controller/WeatherController'
import { WeatherView } from './View/WeatherView'
import { LocationService } from './model/LocationService'
import { WeatherDataService } from './model/WeatherDataService'

const currentWeatherImage = document.getElementById('weather-image') as HTMLImageElement
const weatherTitle = document.getElementById('mainWeather') as HTMLHeadingElement
const currentTemperature = document.getElementById('temp') as HTMLHeadingElement
const dropDown = document.getElementById('tempStyle') as HTMLSelectElement
const errorMessage = document.getElementById('errorMessage') as HTMLParagraphElement
const view = new WeatherView(currentWeatherImage, weatherTitle, currentTemperature, dropDown, errorMessage)

const cityInput = document.getElementById('cityname-input') as HTMLInputElement
const countryCodeInput = document.getElementById('countrycode-input') as HTMLInputElement
const locationService = new LocationService()
const dataService = new WeatherDataService()

const submitButton = document.getElementById('gofetch-button') as HTMLButtonElement
const weatherController = new WeatherController(submitButton, cityInput, countryCodeInput, locationService, dataService, view)
