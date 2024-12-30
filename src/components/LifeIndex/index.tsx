import React from 'react';
import {
  IoSpeedometerOutline,
  IoBarbell,
  IoCar,
  IoShirt,
  IoSunny,
  IoUmbrellaOutline,
  IoThermometerOutline,
  IoWaterOutline,
} from 'react-icons/io5';

interface LifeIndexItem {
  type: string;
  name: string;
  category: string;
}

interface Props {
  data: LifeIndexItem[];
}

const LifeIndex: React.FC<Props> = ({ data }) => {
  const getLifeIndexIcon = (type: string) => {
    const icons = {
      '1': <IoThermometerOutline className='text-2xl' />, // 运动指数
      '2': <IoUmbrellaOutline className='text-2xl' />, // 洗车指数
      '3': <IoShirt className='text-2xl' />, // 穿衣指数
      '4': <IoSunny className='text-2xl' />, // 钓鱼指数
      '5': <IoBarbell className='text-2xl' />, // 运动指数
      '6': <IoCar className='text-2xl' />, // 旅游指数
      '7': <IoWaterOutline className='text-2xl' />, // 过敏指数
      '8': <IoSpeedometerOutline className='text-2xl' />, // 舒适度指数
    };
    return icons[type as keyof typeof icons] || <IoSpeedometerOutline className='text-2xl' />;
  };

  return (
    <div className='bg-white rounded-2xl p-4 md:p-6 shadow-lg h-full'>
      <h3 className='text-lg font-medium text-blue-600 mb-4 md:mb-6 flex items-center gap-2'>
        <IoSpeedometerOutline className='text-xl' />
        生活指数
      </h3>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        {data && data.length > 0 ? (
          data.map((item, index) => (
            <div
              key={index}
              className='bg-gradient-to-br from-blue-50 to-white p-4 rounded-xl border border-blue-100 hover:shadow-md transition-shadow'
            >
              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-3'>
                  <span className='text-blue-500'>{getLifeIndexIcon(item.type)}</span>
                  <span className='text-gray-700 font-medium'>{item.name}</span>
                </div>
                <span className='text-blue-600'>{item.category}</span>
              </div>
            </div>
          ))
        ) : (
          <div className='col-span-2 text-center py-8 text-gray-500'>
            暂无生活指数数据
          </div>
        )}
      </div>
    </div>
  );
};

export default LifeIndex;
