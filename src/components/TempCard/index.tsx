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
    <div className='book'>
      <p>{sentence}</p>
      <div className='cover'>
        <div className='text-2xl flex justify-between'>
          {item.fxDate === dayjs().format('YYYY-MM-DD')
            ? '今天'
            : daysOfWeek[dayjs(item.fxDate).day()]}
          <div className={`qi-${item.iconDay}`} />
        </div>
        <div className='text-xl mt-2'>{dayjs(item.fxDate).format('MM-DD')}</div>
        <div className='text-xl mt-2'>
          {item.tempMin}° ~ {item.tempMax}°
        </div>
      </div>
    </div>
  );
};

export default TempCard;
