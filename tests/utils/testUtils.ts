/**
 * Mocks the fetch function.
 *
 * @param {object} jsonData - The json data to be mocked.
 * @param {boolean} ok - Whether response is ok or not.
 */
export function mockFetch (jsonData: object, ok = true) {
  global.fetch = jest.fn(() =>
    // Typescript was complaining that global.fetch didn't match the mock, I did quick fix and now it works.
    Promise.resolve({
      ok,
      /**
       * Mocked json function.
       *
       * @returns {Promise} - Returns a promise for the json data.
       */
      json: () => Promise.resolve(jsonData),
      headers: new Headers(),
      redirected: false,
      status: 200,
      statusText: 'OK',
      type: 'default',
      url: '',
      bodyUsed: false,
      clone: jest.fn(),
      text: jest.fn(),
      blob: jest.fn(),
      arrayBuffer: jest.fn(),
      body: null,
      trailer: Promise.resolve(new Headers())
    } as unknown as Response)
  )
}

/**
 * Checks whether the passed variable conforms to CurrentWeather type.
 *
 * @param {object} toCheck - The object to check.
 * @returns {boolean} - Whether the object conforms to CurrentWeather type.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isCurrentWeather (toCheck: any) : boolean {
  return toCheck &&
           typeof toCheck.nameOfLocation === 'string' &&
           typeof toCheck.temperature === 'number' &&
           typeof toCheck.description === 'string' &&
           typeof toCheck.mainWeather === 'string' &&
           typeof toCheck.pictureIcon === 'string'
}

export const mockedCurrentWeatherValue = {
  coord: {
    lon: 15.04,
    lat: 58.54
  },
  weather: [
    {
      id: 802,
      main: 'Clouds',
      description: 'scattered clouds',
      icon: '03n'
    }
  ],
  base: 'stations',
  main: {
    temp: 265.47,
    feels_like: 265.47,
    temp_min: 263.61,
    temp_max: 266.96,
    pressure: 989,
    humidity: 74
  },
  visibility: 2374,
  wind: {
    speed: 0.45,
    deg: 187,
    gust: 0.89
  },
  clouds: {
    all: 25
  },
  dt: 1701269409,
  sys: {
    type: 2,
    id: 2011172,
    country: 'SE',
    sunrise: 1701242333,
    sunset: 1701267449
  },
  timezone: 3600,
  id: 2690960,
  name: 'Motala',
  cod: 200
}
