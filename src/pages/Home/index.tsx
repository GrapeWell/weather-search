import { useEffect, useState } from 'react';
import { pinyin } from 'pinyin-pro';
import { memo } from 'react';
import {
  get24HoursForecast,
  get7DayForecast,
  getCityInfo,
  getCityInfoByCityName,
  getWeatherInfo,
  getLifeIndex,
} from './services';
import type { SearchProps } from 'antd/es/input/Search';
import SearchInput from '@/components/SearchInput';
import Radio from '@/components/Radio';
import TempDayCard from '@/components/TempDayCard';
import { HourlyDataItem, LifeIndexItem, WeatherInfo } from './types';
import TempHourCard from '@/components/TempHourCard';
import { motion } from 'framer-motion';
import LifeIndex from '@/components/LifeIndex';
import WeatherDetails from '@/components/WeatherDetails';
import RainChart from '@/components/RainChart';

const HOT_CITIES = [
  '北京',
  '上海',
  '广州',
  '深圳',
  '杭州',
  '南京',
  '成都',
  '重庆',
];

const Home: React.FC = () => {
  const [cityInfo, setCityInfo] = useState({
    city: '',
    district: '',
    name: '',
    id: '',
  });

  const [weatherInfo, setWeatherInfo] = useState<WeatherInfo>({
    temp: 0,
    feelsLike: 0,
    icon: '',
    humidity: 0,
    text: '',
    windSpeed: 0,
    windDir: '',
    pressure: 0,
    vis: 0,
    cloud: 0,
    precip: 0,
    obsTime: '',
  });

  const [activeKey, setActiveKey] = useState('7days');

  const [sevenDayData, setSevenDayData] = useState([]);
  const [hourlyData, setHourlyData] = useState<HourlyDataItem[]>([]);
  const [lifeIndex, setLifeIndex] = useState<LifeIndexItem[]>([]);

  const weatherProcessByGeo = (latitude: number, longitude: number) => {
    getCityInfo(latitude, longitude)
      .then((res) => {
        if (res.data.code === '200') {
          const locationId = res.data.location[0].id;
          setCityInfo({
            city: res.data.location[0].adm1,
            district: res.data.location[0].adm2,
            name: res.data.location[0].name,
            id: locationId,
          });
        } else {
          console.log('未找到该城市的天气信息');
        }
      })
      .catch((error) => {
        console.error('获取城市信息失败:', error);
      });
  };

  const weatherProcessByCity = (city: string) => {
    getCityInfoByCityName(city)
      .then((res) => {
        if (res.data.code === '200') {
          const locationId = res.data.location[0].id;
          setCityInfo({
            city: res.data.location[0].adm1,
            district: res.data.location[0].adm2,
            name: res.data.location[0].name,
            id: locationId,
          });
        } else {
          console.log('未找到该城市的天气信息');
        }
      })
      .catch((error) => {
        console.error('获取城市信息失败:', error);
      });
  };

  const onSearch: SearchProps['onSearch'] = (value) => {
    if (!value.trim()) return;
    weatherProcessByCity(
      pinyin(value, { toneType: 'none' }).replace(/\s*/g, ''),
    );
  };

  useEffect(() => {
    const success = (position: GeolocationPosition) => {
      weatherProcessByGeo(position.coords.latitude, position.coords.longitude);
    };

    function error() {
      console.log('Unable to retrieve your location');
      // 默认显示北京的天气
      weatherProcessByCity('beijing');
    }

    if (!navigator.geolocation) {
      console.log('Geolocation is not supported');
      weatherProcessByCity('beijing');
    } else {
      navigator.geolocation.getCurrentPosition(success, error);
    }
  }, []);

  useEffect(() => {
    if (!cityInfo.id) return;

    const fetchData = async () => {
      try {
        const [weatherRes, lifeIndexRes] = await Promise.all([
          getWeatherInfo(cityInfo.id),
          getLifeIndex(cityInfo.id),
        ]);

        if (weatherRes.data.code === '200') {
          setWeatherInfo(weatherRes.data.now);
        }
        if (lifeIndexRes.data.code === '200') {
          setLifeIndex(lifeIndexRes.data.daily);
        }
      } catch (error) {
        console.error('获取天气信息失败:', error);
      }
    };

    fetchData();
  }, [cityInfo.id]);

  useEffect(() => {
    if (!cityInfo.id) return;

    const fetchForecast = async () => {
      try {
        const forecastRes = await (activeKey === '7days'
          ? get7DayForecast(cityInfo.id)
          : get24HoursForecast(cityInfo.id));

        if (forecastRes.data.code === '200') {
          if (activeKey === '7days') {
            setSevenDayData(forecastRes.data.daily);
          } else {
            setHourlyData(forecastRes.data.hourly);
          }
        }
      } catch (error) {
        console.error('获取预报数据失败:', error);
      }
    };

    fetchForecast();
  }, [activeKey, cityInfo.id]);

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 to-white'>
      <div className='container mx-auto px-4 py-8'>
        <div className='md:flex md:gap-8 md:h-[calc(100vh-4rem)]'>
          {/* 左侧面板 */}
          <div className='md:w-[360px] md:flex-shrink-0 mb-6 md:mb-0 md:flex md:flex-col'>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className='bg-white rounded-xl p-6 shadow-lg mb-4'>
              <div className='flex items-center justify-between mb-6'>
                <SearchInput onSearch={onSearch} />
              </div>
              <div>
                <div className='flex flex-wrap gap-2'>
                  {HOT_CITIES.map((city) => (
                    <button
                      key={city}
                      onClick={() => weatherProcessByCity(city)}
                      className='px-2 py-1 text-sm bg-blue-50 hover:bg-blue-100 rounded transition-colors'>
                      {city}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className='bg-white rounded-xl p-6 shadow-lg flex-1 flex flex-col'>
              <div className='text-center mb-4'>
                <h2 className='text-xl font-semibold text-gray-700'>
                  {cityInfo.name}
                </h2>
                <p className='text-gray-500'>
                  {cityInfo.city} {cityInfo.district}
                </p>
              </div>
              <div className='flex items-center justify-center'>
                <span className='text-6xl font-light text-blue-600'>
                  {weatherInfo.temp}°
                </span>
                <div className='ml-6'>
                  <p className='text-xl text-gray-600'>{weatherInfo.text}</p>
                  <p className='text-sm text-gray-500 mt-1'>
                    体感温度 {weatherInfo.feelsLike}°
                  </p>
                </div>
              </div>
              <WeatherDetails data={weatherInfo} />
            </motion.div>
          </div>

          {/* 右侧面板 */}
          <div className='md:flex-1 min-w-0 md:flex md:flex-col'>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className='bg-white rounded-xl p-6 shadow-lg mb-4'>
              <Radio
                radioList={[
                  { name: '近7天', key: '7days' },
                  { name: '近24小时', key: '7hours' },
                ]}
                setActiveKey={setActiveKey}
                activeKey={activeKey}
              />
              <div className='mt-4 overflow-x-auto'>
                {activeKey === '7days' ? (
                  sevenDayData.length > 0 ? (
                    <div className='flex md:grid md:grid-cols-7 gap-4 min-w-max md:min-w-0 pb-2 md:pb-0'>
                      {sevenDayData.map((item, index) => (
                        <TempDayCard key={index} item={item} />
                      ))}
                    </div>
                  ) : (
                    <div className='bg-gradient-to-br from-blue-50 to-white p-4 rounded-lg text-center text-gray-500'>
                      暂无天气预报数据
                    </div>
                  )
                ) : hourlyData.length > 0 ? (
                  <div className='flex gap-4 min-w-max pb-2'>
                    {hourlyData.map((item, index) => (
                      <TempHourCard key={index} data={item} />
                    ))}
                  </div>
                ) : (
                  <div className='bg-gradient-to-br from-blue-50 to-white p-4 rounded-lg text-center text-gray-500'>
                    暂无逐小时天气数据
                  </div>
                )}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className='flex-1 flex flex-col min-h-0'>
              <LifeIndex data={lifeIndex} />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className='hidden md:block mt-4 flex-1 min-h-0'>
              <RainChart data={hourlyData} />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Home);
