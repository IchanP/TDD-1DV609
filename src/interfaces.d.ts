interface ILocationService {
    fetchLocationData(cityName: string, countryCode: string): Promise<LocationData>
}
