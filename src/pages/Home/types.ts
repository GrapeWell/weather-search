export interface HourlyDataItem {
  fxTime: string; 
  temp: number;
  pop: number;
  icon: string;
  // Add other properties as needed
}

export interface LifeIndexItem {
  date: string;
  type: string;
  name: string;
  level: string;
  category: string;
  text: string;
}

export interface WeatherInfo {
  temp: number;
  feelsLike: number;
  icon: string;
  humidity: number;
  text: string;
  windSpeed: number;
  windDir: string;
  pressure: number;
  vis: number;
  cloud: number;
  precip: number;
  obsTime: string;
}
