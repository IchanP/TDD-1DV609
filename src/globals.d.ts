type LocationData = {
    lat: number,
    lon: number,
}

type CityApiResponse = {
    name: string;
    local_names?: { [key: string]: string }; // An optional field with dynamic keys
    lat: number;
    lon: number;
    country: string;
}

type CurrentWeather = {
    nameOfLocation: string;
    temperature: number;
    description: string;
    mainWeather: string;
    pictureIcon: string;
}

type UnitType = 'metric' | 'imperial'
