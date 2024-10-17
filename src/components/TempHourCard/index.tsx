import dayjs from 'dayjs';
import React from 'react';
import './index.less';

const TempHourCard: React.FC = ({ item }) => {
  return (
    <div className='temp-hour-card mr-4 last:mr-0 <md:flex-shrink-0 shadow-md <md:h-8rem items-center'>
      <div className='text-xl <md:text-lg'>
        {dayjs(item.fxTime).format('HH:mm')}
      </div>
      <div className={`qi-${item.icon} text-4xl`} />
      <div className='text-xl mt-2 <md:mt-0 <md:text-lg'>{item.temp}℃</div>
    </div>
  );
};

export default TempHourCard;
