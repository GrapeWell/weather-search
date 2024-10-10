import dayjs from 'dayjs';
import './index.less';
import { useEffect, useState } from 'react';
import { getSentence } from './services';
import { Item } from './types';
const daysOfWeek = [
  '星期日',
  '星期一',
  '星期二',
  '星期三',
  '星期四',
  '星期五',
  '星期六',
];

const TempCard: React.FC<{ item: Item }> = ({ item }) => {
  const [sentence, setSentence] = useState('');
  useEffect(() => {
    setTimeout(() => {
      getSentence(setSentence);
    }, 500);
  }, []);
  return (
    <div className='book <md:w-full <md:h-auto'>
      <p>{sentence}</p>
      <div className='cover <md:flex-row <md:justify-between <md:items-center'>
        <div className='text-2xl flex justify-between <md:text-lg'>
          {item.fxDate === dayjs().format('YYYY-MM-DD') ? (
            <span className='mr-1.1rem'>今日</span>
          ) : (
            daysOfWeek[dayjs(item.fxDate).day()]
          )}
          <div className={`qi-${item.iconDay} <md:ml-2`} />
        </div>
        <div className='text-xl mt-2 <md:mt-0 <md:text-lg'>
          {dayjs(item.fxDate).format('MM-DD')}
        </div>
        <div className='text-xl mt-2 <md:mt-0 <md:text-lg'>
          {item.tempMin}° ~ {item.tempMax}°
        </div>
      </div>
    </div>
  );
};

export default TempCard;
