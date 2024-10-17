import { useEffect, useState } from 'react';
import { pinyin } from 'pinyin-pro';
import { memo } from 'react';
import {
  get24HoursForecast,
  get7DayForecast,
  getCityInfo,
  getCityInfoByCityName,
  getWeatherInfo,
} from './services';
import type { SearchProps } from 'antd/es/input/Search';
import SearchInput from '@/components/SearchInput';
import dayjs from 'dayjs';
import MyIcon from '@/components/IconFont';
import Radio from '@/components/Radio';
import TempDayCard from '@/components/TempDayCard';
import { HourlyDataItem } from './types';
import TempHourCard from '@/components/TempHourCard';

const Home: React.FC = () => {
  const [cityInfo, setCityInfo] = useState({
    city: '',
    district: '',
    name: '',
    id: '',
  });

  const [weatherInfo, setWeatherInfo] = useState({
    temp: 0,
    feelsLike: 0,
    icon: '',
    humidity: 0,
    text: '',
    windSpeed: 0,
    obsTime: '',
  });

  const [activeKey, setActiveKey] = useState('7days');

  const [sevenDayData, setSevenDayData] = useState([]);
  const [hourlyData, setHourlyData] = useState<HourlyDataItem[]>([]);

  const weatherProcessByGeo = (latitude: number, longitude: number) => {
    getCityInfo(latitude, longitude).then((res) => {
      if (res.data.code === '200') {
        setCityInfo({
          city: res.data.location[0].adm1,
          district: res.data.location[0].adm2,
          name: res.data.location[0].name,
          id: res.data.location[0].id,
        });
        getWeatherInfo(res.data.location[0].id).then((res) => {
          if (res.data.code === '200') {
            setWeatherInfo(res.data.now);
          }
        });
      } else {
        console.log('未找到该城市的天气信息');
      }
    });
  };

  const weatherProcessByCity = (city: string) => {
    getCityInfoByCityName(city).then((res) => {
      if (res.data.code === '200') {
        const locationId = res.data.location[0].id;
        setCityInfo({
          city: res.data.location[0].adm1,
          district: res.data.location[0].adm2,
          name: res.data.location[0].name,
          id: locationId,
        });
        getWeatherInfo(locationId).then((res) => {
          if (res.data.code === '200') {
            setWeatherInfo(res.data.now);
          }
        });
        if (activeKey === '7days') {
          get7DayForecast(locationId).then((res) => {
            if (res.data.code === '200') {
              setSevenDayData(res.data.daily);
            }
          });
        } else if (activeKey === '7hours') {
          get24HoursForecast(locationId).then((res) => {
            if (res.data.code === '200') {
              setHourlyData(res.data.hourly);
            }
          });
        }
      } else {
        console.log('未找到该城市的天气信息');
      }
    });
  };

  const onSearch: SearchProps['onSearch'] = (value) => {
    weatherProcessByCity(
      pinyin(value, { toneType: 'none' }).replace(/\s*/g, ''),
    );
  };

  // 获取位置
  useEffect(() => {
    const success = (position: GeolocationPosition) => {
      weatherProcessByGeo(position.coords.latitude, position.coords.longitude);
    };

    function error() {
      console.log('Unable to retrieve your location');
    }

    if (!navigator.geolocation) {
      console.log('error');
    } else {
      navigator.geolocation.getCurrentPosition(success, error);
    }
  }, []);

  useEffect(() => {
    if (!cityInfo.id) {
      return;
    }
    if (activeKey === '7days') {
      get7DayForecast(cityInfo.id).then((res) => {
        if (res.data.code === '200') {
          setSevenDayData(res.data.daily);
        }
      });
    } else if (activeKey === '7hours') {
      get24HoursForecast(cityInfo.id).then((res) => {
        if (res.data.code === '200') {
          setHourlyData(res.data.hourly);
        }
      });
    }
  }, [cityInfo.id, activeKey]);

  return (
    <div className='flex flex-col h-screen items-center bg-base w-full <md:p-20px'>
      <div className='flex items-center mt-12 <md:mt-0 w-3xl <md:w-full justify-between '>
        <div className='flex items-center'>
          <SearchInput onSearch={onSearch} />
        </div>
        <div className='text-xl text-primary <md:text-sm'>
          {dayjs().format('YYYY年MM月DD日')}
        </div>
      </div>
      <div className='h-md flex items-center flex-col justify-center'>
        <div className='mb-16'>
          <span className='text-xl text-primary mr-4'>{cityInfo.city}</span>
          <span className='text-xl text-primary mr-4'>{cityInfo.district}</span>
          {cityInfo.district !== cityInfo.name && (
            <span className='text-xl text-primary'>{cityInfo.name}</span>
          )}
        </div>
        <div className='flex items-center'>
          <div className='mr-16 <md:mr-10'>
            <div className='text-8xl text-primary'>{weatherInfo.temp}°</div>
          </div>
          <div className='text-secondary'>
            <div className='mb-2'>
              <MyIcon type='icon-fengsu' className='text-2xl mr-4 :md<mr-1' />
              <span className='text-2xl '>{weatherInfo.windSpeed} mph</span>
            </div>
            <div>
              <MyIcon type='icon-kongqishidu' className='text-2xl mr-4' />
              <span className='text-2xl'>{weatherInfo.humidity} %</span>
            </div>
          </div>
        </div>
        <div className='text-xl <md:text-2xl text-primary'>
          {weatherInfo.text}
        </div>
      </div>
      <div className='flex-1 w-7xl flex flex-col <md:w-full'>
        <Radio
          radioList={[
            {
              name: '近7天',
              key: '7days',
            },
            {
              name: '近24小时',
              key: '7hours',
            },
          ]}
          setActiveKey={setActiveKey}
          activeKey={activeKey}
        />
        {activeKey === '7days' ? (
          <div className='flex mt-4 justify-between <md:w-full <md:overflow-auto <md:flex-1'>
            {sevenDayData.map((item, index) => {
              return <TempDayCard item={item} key={index} />;
            })}
          </div>
        ) : (
          <div className='<md:overflow-auto flex mt-4 justify-between overflow-auto'>
            {hourlyData.map((item, index) => {
              return <TempHourCard item={item} key={index} />;
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default memo(Home);
