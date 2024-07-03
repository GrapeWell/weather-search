import { useEffect, useState } from "react";
import Header from "../../components/Header";
import WeatherCard from "../../components/WeatherCard";
import "./index.less";
import { getCityInfo, getCityInfoByCityName, getWeatherInfo } from "./services";

const Home = () => {
  const [position, setPosition] = useState({
    latitude: 0,
    longitude: 0,
  });

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

  function success(position) {
    setPosition({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    });
    weatherProcessByGeo(position.coords.latitude, position.coords.longitude);
  }

  function error() {
    console.log("Unable to retrieve your location");
  }

  function weatherProcessByGeo(latitude, longitude) {
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

  function weatherProcessByCity(city) {
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

  // 获取位置
  useEffect(() => {
    if (!navigator.geolocation) {
      console.log("error");
    } else {
      navigator.geolocation.getCurrentPosition(success, error);
    }
  }, []);

  return (
    <div className="home">
      <Header searchFnc={weatherProcessByCity} />
      <WeatherCard weatherInfo={weatherInfo} cityInfo={cityInfo} />
    </div>
  );
};

export default Home;
