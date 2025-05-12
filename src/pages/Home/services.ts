import { default as axios } from '@/request';

interface ApiResponse<T = Record<string, any>> {
  code: number;
  message: string;
  data: T;
}

// 获取城市信息
export const getCityInfo = async (latitud: number, longitud: number): Promise<ApiResponse> => {
  return await axios.get(
    `/api/city/lookup?location=${longitud.toFixed(2)},${latitud.toFixed(2)}`,
  );
};

export const getCityInfoByCityName = async (cityName: string): Promise<ApiResponse> => {
  return await axios.get(`/api/city/lookup?location=${cityName}`);
};

// 获取当前天气
export const getWeatherInfo = async (cityId: string): Promise<ApiResponse> => {
  return await axios.get(`/api/weather/now?location=${cityId}`);
};

// 获取7天预报
export const get7DayForecast = async (locationId: string): Promise<ApiResponse> => {
  return await axios.get(`/api/weather/7d?location=${locationId}`);
};

// 获取24小时预报
export const get24HoursForecast = async (locationId: string): Promise<ApiResponse> => {
  return await axios.get(`/api/weather/24h?location=${locationId}`);
};

export const getLifeIndex = async (locationId: string): Promise<ApiResponse> => {
  return await axios.get(`/api/indices/1d?location=${locationId}&type=1,2,3,5`);
};
