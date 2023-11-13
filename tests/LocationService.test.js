describe('LocationService', () => {
  // Reinstating the LocationService class before each test
  beforeAll(() => {
    locationService = new LocationService()
  })

  it('should throw an error if country code is not provided', () => {
    expect(() => {
      locationService.fetchLocationData('London').toThrow()
    })
  })
})
