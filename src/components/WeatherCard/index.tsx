import { Props } from "./types";

const WeatherCard = (props: Props) => {
  const { cityInfo, weatherInfo } = props;
  return (
    <div className="text-white w-500px p-12px border border-solid border-weatherCardBorder rounded bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <div className="flex items-center justify-between">
        <div>
          <span style={{ marginRight: "10px" }}>{cityInfo.city}</span>
          <span style={{ marginRight: "10px" }}>{cityInfo.district}</span>
          {cityInfo.district !== cityInfo.name && <span>{cityInfo.name}</span>}
        </div>
      </div>
      <div className="mt-12px flex items-center justify-between">
        <div>
          <span className="text-[24px]">{weatherInfo.temp}</span>
          <span>℃</span>
        </div>
        <div>{weatherInfo.text}</div>
      </div>
      <div className="flex items-center justify-between mt-[12px]">
        <div className="feels-like">体感温度：{weatherInfo.feelsLike}℃</div>
        <div>风速：{weatherInfo.windSpeed}公里/小时</div>
        <div>湿度：{weatherInfo.humidity}%</div>
      </div>
    </div>
  );
};

export default WeatherCard;
