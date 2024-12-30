import { Props } from './types';

const Radio: React.FC<Props> = ({ radioList, setActiveKey, activeKey }) => {
  return (
    <div className='flex p-1 rounded-lg bg-blue-50/50 w-full md:w-auto'>
      {radioList.map((radio, index) => (
        <button
          key={index}
          onClick={() => setActiveKey(radio.key)}
          className={`
            flex-1 px-4 py-2 text-sm font-medium rounded-md transition-all
            ${radio.key === activeKey
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-gray-600 hover:text-blue-600 hover:bg-white/50'
            }
          `}
        >
          {radio.name}
        </button>
      ))}
    </div>
  );
};

export default Radio;
