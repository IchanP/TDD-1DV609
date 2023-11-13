import LocationService from '../src/LocationService.ts'

describe('LocationService', () => {
/*  let locationService
  // Reinstating the LocationService class before each test
  beforeAll(() => {
    locationService = new LocationService()
  }) */

  it('should throw an error if country code is not provided', () => {
    expect(() => {
      const locationService = new LocationService()
      locationService.fetchLocationData('London').toThrow()
    })
  })
})
