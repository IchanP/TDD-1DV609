import { LocationService } from '../src/model/LocationService.ts'
import { NoCountryCodeError } from '../src/model/Errors/NoCountryCodeError.ts'

describe('LocationService', () => {
/*  let locationService
  // Reinstating the LocationService class before each test
  beforeAll(() => {
    locationService = new LocationService()
  }) */

  it('should throw an error if country code is not provided', () => {
    const locationService = new LocationService()
    expect(() => locationService.fetchLocationData('London')).toThrow(NoCountryCodeError)
  })
})
