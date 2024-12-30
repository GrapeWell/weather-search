import React from 'react';
import {
  WiHumidity,
  WiStrongWind,
  WiWindDeg,
  WiCloudy,
  WiBarometer,
  WiRaindrop,
  WiDaySunny,
} from 'react-icons/wi';
import { motion } from 'framer-motion';

interface WeatherInfo {
  temp: number;
  feelsLike: number;
  icon: string;
  humidity: number;
  text: string;
  windSpeed: number;
  windDir?: string;
  pressure?: number;
  vis?: number;
  cloud?: number;
  precip?: number;
  obsTime: string;
}

interface Props {
  data: WeatherInfo;
}

const WeatherDetails: React.FC<Props> = ({ data }) => {
  const details = [
    {
      icon: <WiStrongWind className="text-2xl" />,
      label: "风速",
      value: `${data.windSpeed} km/h`,
    },
    {
      icon: <WiWindDeg className="text-2xl" />,
      label: "风向",
      value: data.windDir || "未知",
    },
    {
      icon: <WiHumidity className="text-2xl" />,
      label: "湿度",
      value: `${data.humidity}%`,
    },
    {
      icon: <WiCloudy className="text-2xl" />,
      label: "云量",
      value: data.cloud ? `${data.cloud}%` : "未知",
    },
    {
      icon: <WiBarometer className="text-2xl" />,
      label: "气压",
      value: data.pressure ? `${data.pressure} hPa` : "未知",
    },
    {
      icon: <WiDaySunny className="text-2xl" />,
      label: "能见度",
      value: data.vis ? `${data.vis} km` : "未知",
    },
    {
      icon: <WiRaindrop className="text-2xl" />,
      label: "降水量",
      value: data.precip ? `${data.precip} mm` : "0 mm",
    },
  ];

  return (
    <div className="mt-6">
      <div className="grid grid-cols-2 md:grid-cols-1 gap-3">
        {details.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-gradient-to-br from-blue-50 to-white p-3 rounded-lg border border-blue-100 md:flex md:items-center md:justify-between"
          >
            <div className="flex items-center gap-2 text-blue-500 mb-1 md:mb-0">
              {item.icon}
              <span className="text-sm text-gray-600">{item.label}</span>
            </div>
            <div className="text-sm font-medium text-gray-700 md:text-right">{item.value}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default WeatherDetails;
