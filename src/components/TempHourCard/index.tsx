import React from 'react';
import { HourlyDataItem } from '@/pages/Home/types';
import dayjs from 'dayjs';
import { WiRaindrops } from 'react-icons/wi';
import './index.less';
import { motion } from 'framer-motion';

interface Props {
  data?: HourlyDataItem;
}

const TempHourCard: React.FC<Props> = ({ data }) => {
  if (!data) {
    return (
      <div className='w-24 p-3 rounded-xl bg-gradient-to-br from-blue-50 to-white border border-blue-100 text-center text-gray-500'>
        暂无数据
      </div>
    );
  }

  const isCurrentHour = dayjs(data.fxTime).format('HH') === dayjs().format('HH');

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className='w-24 p-3 rounded-xl bg-gradient-to-br from-blue-50 to-white border border-blue-100 shadow-sm hover:shadow-md transition-shadow'
    >
      <div className='flex flex-col items-center'>
        <span className={`text-sm font-medium ${isCurrentHour ? 'text-blue-600' : 'text-gray-700'}`}>
          {dayjs(data.fxTime).format('HH:mm')}
        </span>
        <div className={`qi-${data.icon} text-3xl my-2 text-blue-500`} />
        <span className='text-sm font-medium text-gray-600'>{data.temp}°</span>
        <div className="flex items-center justify-center gap-1 mt-2 text-gray-600 md:hidden">
          <WiRaindrops className="text-lg" />
          <span className="text-sm">{data.pop}%</span>
        </div>
      </div>
    </motion.div>
  );
};

export default TempHourCard;
