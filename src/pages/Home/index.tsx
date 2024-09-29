import { useEffect, useState } from "react";
import { Input } from "antd";
import { pinyin } from "pinyin-pro";
import { memo } from "react";
import WeatherCard from "@/components/WeatherCard";
import { getCityInfo, getCityInfoByCityName, getWeatherInfo } from "./services";
import type { SearchProps } from "antd/es/input/Search";
const { Search } = Input;

const Home:React.FC = () => {
  const [cityInfo, setCityInfo] = useState({
    city: "",
    district: "",
    name: "",
  });

  const [weatherInfo, setWeatherInfo] = useState({
    temp: 0,
    feelsLike: 0,
    icon: "",
    humidity: 0,
    text: "",
    windSpeed: 0,
    obsTime: "",
  });

  function weatherProcessByGeo(latitude: number, longitude: number) {
    getCityInfo(latitude, longitude).then((res) => {
      if (res.data.code === "200") {
        setCityInfo({
          city: res.data.location[0].adm1,
          district: res.data.location[0].adm2,
          name: res.data.location[0].name,
        });
        getWeatherInfo(res.data.location[0].id).then((res) => {
          if (res.data.code === "200") {
            setWeatherInfo(res.data.now);
          }
        });
      } else {
        console.log("未找到该城市的天气信息");
      }
    });
  }

  function weatherProcessByCity(city: string) {
    getCityInfoByCityName(city).then((res) => {
      if (res.data.code === "200") {
        setCityInfo({
          city: res.data.location[0].adm1,
          district: res.data.location[0].adm2,
          name: res.data.location[0].name,
        });
        getWeatherInfo(res.data.location[0].id).then((res) => {
          if (res.data.code === "200") {
            setWeatherInfo(res.data.now);
          }
        });
      } else {
        console.log("未找到该城市的天气信息");
      }
    });
  }

  const onSearch: SearchProps["onSearch"] = (value) => {
    weatherProcessByCity(pinyin(value, { toneType: "none" }).replace(/\s*/g, ""))
  };

  // 获取位置
  useEffect(() => {
    const success = (position: GeolocationPosition) => {
      weatherProcessByGeo(position.coords.latitude, position.coords.longitude);
    }
  
    function error() {
      console.log("Unable to retrieve your location");
    }

    if (!navigator.geolocation) {
      console.log("error");
    } else {
      navigator.geolocation.getCurrentPosition(success, error);
    }
  }, []);

  return (
    <div className="flex flex-col items-center h-screen bg-homeBackground justify-center">
      <div className="flex items-center justify-center h-60px pl-30px pr-30px">
      <Search
        placeholder="请输入城市名称"
        allowClear
        onSearch={onSearch}
        style={{ width: 304 }}
      />
    </div>
      <WeatherCard weatherInfo={weatherInfo} cityInfo={cityInfo} />
    </div>
  );
};

export default memo(Home);
