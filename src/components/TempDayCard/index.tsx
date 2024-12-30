import React from 'react';
import dayjs from 'dayjs';
import './index.less';
import { motion } from 'framer-motion';

const WEEK_MAP = [
  '周日',
  '周一',
  '周二',
  '周三',
  '周四',
  '周五',
  '周六',
];

interface Props {
  item: {
    fxDate: string;
    tempMax: number;
    tempMin: number;
    iconDay: string;
    textDay: string;
  };
}

const TempDayCard: React.FC<Props> = ({ item }) => {
  const isToday = item.fxDate === dayjs().format('YYYY-MM-DD');
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className='bg-gradient-to-br from-blue-50 to-white p-4 rounded-lg border border-blue-100 hover:shadow-md transition-shadow w-[120px] md:w-auto'
    >
      <div className='flex flex-col items-center'>
        <span className={`text-sm font-medium ${isToday ? 'text-blue-600' : 'text-gray-700'}`}>
          {isToday ? '今天' : WEEK_MAP[dayjs(item.fxDate).day()]}
        </span>
        <span className='text-xs text-gray-500 mt-1'>
          {dayjs(item.fxDate).format('MM/DD')}
        </span>
        <div className={`qi-${item.iconDay} text-3xl my-2 text-blue-500`} />
        <span className='text-xs text-gray-600 mb-2'>{item.textDay}</span>
        <div className='flex items-center gap-2'>
          <span className='text-sm font-medium text-gray-700'>{item.tempMax}°</span>
          <span className='text-xs text-gray-400'>/</span>
          <span className='text-sm text-gray-500'>{item.tempMin}°</span>
        </div>
      </div>
    </motion.div>
  );
};

export default TempDayCard;
