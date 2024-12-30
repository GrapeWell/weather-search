import axios from 'axios';

// 获取城市信息
export const getCityInfo = async (latitud: number, longitud: number) => {
  return await axios.get(
    `https://geoapi.qweather.com/v2/city/lookup?location=${longitud.toFixed(2)},${latitud.toFixed(2)}&key=cdc2853484e341e0a1efb073503129a4`,
  );
};

export const getCityInfoByCityName = async (cityName: string) => {
  return await axios.get(
    `https://geoapi.qweather.com/v2/city/lookup?location=${cityName}&key=cdc2853484e341e0a1efb073503129a4`,
  );
};

// 获取当前天气
export const getWeatherInfo = async (cityId: string) => {
  return await axios.get(
    `https://devapi.qweather.com/v7/weather/now?location=${cityId}&key=cdc2853484e341e0a1efb073503129a4`,
  );
};

// 获取7天预报
export const get7DayForecast = async (locationId: string) => {
  return await axios.get(
    `https://devapi.qweather.com/v7/weather/7d?location=${locationId}&key=cdc2853484e341e0a1efb073503129a4`,
  );
};

// 获取24小时预报
export const get24HoursForecast = async (locationId: string) => {
  return await axios.get(
    `https://devapi.qweather.com/v7/weather/24h?location=${locationId}&key=cdc2853484e341e0a1efb073503129a4`,
  );
};

export const getLifeIndex = async (locationId: string) => {
  return await axios.get(
    `https://devapi.qweather.com/v7/indices/1d?location=${locationId}&key=cdc2853484e341e0a1efb073503129a4&type=1,2,3,5`,
  );
};