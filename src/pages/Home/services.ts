import axios from "axios"

export const getCityInfo = async (latitud: number, longitud: number) => {
  return await axios.get(`https://geoapi.qweather.com/v2/city/lookup?location=${longitud.toFixed(2)},${latitud.toFixed(2)}&key=cdc2853484e341e0a1efb073503129a4`)
}

export const getCityInfoByCityName = async (cityName: string) => {
  return await axios.get(`https://geoapi.qweather.com/v2/city/lookup?location=${cityName}&key=cdc2853484e341e0a1efb073503129a4`)
}

export const getWeatherInfo = async (cityId: string) => {
  return await axios.get(`https://devapi.qweather.com/v7/weather/now?location=${cityId}&key=cdc2853484e341e0a1efb073503129a4`)
}