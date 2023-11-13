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
