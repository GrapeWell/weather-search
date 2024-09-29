interface CityInfo {
  name: string;
  city: string;
  district: string;
}

interface WeatherInfo {
  temp: number;
  text: string;
  feelsLike: number;
  windSpeed: number;
  humidity: number;
}

export interface Props {
  cityInfo: CityInfo;
  weatherInfo: WeatherInfo;
}
