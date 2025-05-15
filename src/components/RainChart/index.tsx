import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { HourlyDataItem } from '@/pages/Home/types';
import dayjs from 'dayjs';
import { IoUmbrellaOutline } from 'react-icons/io5';
import { useTranslation } from 'react-i18next';

interface Props {
  data: HourlyDataItem[];
}

const RainChart: React.FC<Props> = ({ data }) => {
  const { t } = useTranslation();
  if (!data?.length) {
    return (
      <div className='bg-white rounded-2xl p-4 md:p-6 shadow-lg h-full flex flex-col'>
        <h3 className='text-lg font-medium text-blue-600 mb-4 md:mb-6 flex items-center gap-2'>
          <IoUmbrellaOutline className='text-xl' />
          {t('降雨概率')}
        </h3>
        <div className='flex-1 flex items-center justify-center text-gray-500 text-center'>
          <div>
            <p className='mb-2'>☔️</p>
            <p>{t('切换到24小时预报查看降雨概率')}</p>
          </div>
        </div>
      </div>
    );
  }

  const formattedData = data.map((item) => ({
    ...item,
    time: dayjs(item.fxTime).format('HH:mm'),
  }));

  return (
    <div className='bg-white rounded-2xl p-4 md:p-6 shadow-lg h-full flex flex-col'>
      <h3 className='text-lg font-medium text-blue-600 mb-4 md:mb-6 flex items-center gap-2'>
        <IoUmbrellaOutline className='text-xl' />
        {t('24小时降雨概率')}
      </h3>
      <div className='flex-1'>
        <ResponsiveContainer width='100%' aspect={6}>
          <LineChart data={formattedData}>
            <defs>
              <linearGradient id='rainGradient' x1='0' y1='0' x2='0' y2='1'>
                <stop offset='5%' stopColor='#3b82f6' stopOpacity={0.3} />
                <stop offset='95%' stopColor='#3b82f6' stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray='3 3'
              stroke='#e5e7eb'
              vertical={false}
            />
            <XAxis
              dataKey='time'
              tick={{ fontSize: 12, fill: '#6b7280' }}
              interval={2}
              axisLine={{ stroke: '#e5e7eb' }}
              tickLine={{ stroke: '#e5e7eb' }}
            />
            <YAxis
              tick={{ fontSize: 12, fill: '#6b7280' }}
              unit='%'
              domain={[0, 100]}
              axisLine={{ stroke: '#e5e7eb' }}
              tickLine={{ stroke: '#e5e7eb' }}
            />
            <Tooltip
              formatter={(value: number) => [`${value}%`, `${t('降雨概率')}`]}
              labelFormatter={(label) => `${t('时间')}: ${label}`}
              contentStyle={{
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                border: '1px solid #e5e7eb',
                borderRadius: '6px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
              }}
            />
            <Line
              type='monotone'
              dataKey='pop'
              stroke='#3b82f6'
              strokeWidth={2.5}
              dot={false}
              activeDot={{
                r: 6,
                fill: '#3b82f6',
                stroke: '#fff',
                strokeWidth: 2,
              }}
              fill='url(#rainGradient)'
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RainChart;
