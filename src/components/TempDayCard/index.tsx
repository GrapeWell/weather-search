import React from 'react';
import dayjs from 'dayjs';
import './index.css';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();

  const WEEK_MAP = [
    t('周日'),
    t('周一'),
    t('周二'),
    t('周三'),
    t('周四'),
    t('周五'),
    t('周六'),
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className='bg-gradient-to-br from-blue-50 to-white p-4 rounded-lg border border-blue-100 hover:shadow-md transition-shadow w-[120px] md:w-auto'>
      <div className='flex flex-col items-center'>
        <span
          className={`text-sm font-medium ${isToday ? 'text-blue-600' : 'text-gray-700'}`}>
          {isToday ? t('今天') : WEEK_MAP[dayjs(item.fxDate).day()]}
        </span>
        <span className='text-xs text-gray-500 mt-1'>
          {dayjs(item.fxDate).format('MM/DD')}
        </span>
        <div className={`qi-${item.iconDay} text-3xl my-2 text-blue-500`} />
        <span className='text-xs text-gray-600 mb-2'>{item.textDay}</span>
        <div className='flex items-center gap-2'>
          <span className='text-sm font-medium text-gray-700'>
            {item.tempMax}°
          </span>
          <span className='text-xs text-gray-400'>/</span>
          <span className='text-sm text-gray-500'>{item.tempMin}°</span>
        </div>
      </div>
    </motion.div>
  );
};

export default TempDayCard;
