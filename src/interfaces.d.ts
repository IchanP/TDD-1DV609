interface ILocationService {
    fetchLocationData(cityName: string, countryCode: string): Promise<LocationData>
}

interface IWeatherProvider {
    fetchCurrentWeatherData(latAndLong: LocationData, unitType? : UnitType): Promise<>
}
