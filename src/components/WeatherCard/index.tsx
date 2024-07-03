import "./index.less";

const WeatherCard = (props) => {
  const { cityInfo, weatherInfo } = props;
  return (
    <div className="weather-card">
      <div className="city-info">
        <div>
          <span style={{ marginRight: "10px" }}>{cityInfo.city}</span>
          <span style={{ marginRight: "10px" }}>{cityInfo.district}</span>
          {cityInfo.district !== cityInfo.name && <span>{cityInfo.name}</span>}
        </div>
      </div>
      <div className="weather-info">
        <div className="temperature">
          <span className="temp">{weatherInfo.temp}</span>
          <span>℃</span>
        </div>
        <div>{weatherInfo.text}</div>
      </div>
      <div className="detail-info">
        <div className="feels-like">体感温度：{weatherInfo.feelsLike}℃</div>
        <div>风速：{weatherInfo.windSpeed}公里/小时</div>
        <div>湿度：{weatherInfo.humidity}%</div>
      </div>
    </div>
  );
};

export default WeatherCard;
