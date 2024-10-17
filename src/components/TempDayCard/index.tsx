import dayjs from 'dayjs';
import './index.less';
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
  return (
    <div className='temp-day-card mr-4 last:mr-0 <md:p-1 <md:flex-shrink-0 shadow-gray-200 shadow-md <md:h-8rem bg-base text-base'>
      <div className='text-2xl flex justify-between <md:text-lg'>
        {item.fxDate === dayjs().format('YYYY-MM-DD')
          ? '今日'
          : daysOfWeek[dayjs(item.fxDate).day()]}
        <div className={`qi-${item.iconDay}`} />
      </div>
      <div className='text-xl mt-2 <md:mt-0 <md:text-lg'>
        {dayjs(item.fxDate).format('MM-DD')}
      </div>
      <div className='text-xl mt-2 <md:mt-0 <md:text-lg'>
        {item.tempMin}° ~ {item.tempMax}°
      </div>
    </div>
  );
};

export default TempCard;
