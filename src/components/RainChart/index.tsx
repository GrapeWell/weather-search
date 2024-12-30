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

interface Props {
  data: HourlyDataItem[];
}

const RainChart: React.FC<Props> = ({ data }) => {
  const formattedData = data.map(item => ({
    ...item,
    time: dayjs(item.fxTime).format('HH:mm'),
  }));

  return (
    <div className="bg-white rounded-2xl p-4 md:p-6 shadow-lg h-full flex flex-col">
      <h3 className="text-lg font-medium text-blue-600 mb-4 md:mb-6 flex items-center gap-2">
        <IoUmbrellaOutline className="text-xl" />
        降雨概率
      </h3>
      <div className="flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={formattedData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="time"
              tick={{ fontSize: 12 }}
              interval={2}
            />
            <YAxis
              tick={{ fontSize: 12 }}
              unit="%"
              domain={[0, 100]}
            />
            <Tooltip
              formatter={(value: number) => [`${value}%`, '降雨概率']}
              labelFormatter={(label) => `时间: ${label}`}
            />
            <Line
              type="monotone"
              dataKey="pop"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={{ fill: '#3b82f6', r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RainChart;
