import './index.less';
import cs from 'classnames';
import { Props } from './types';

const Radio: React.FC<Props> = ({ radioList, setActiveKey, activeKey }) => {
  return (
    <div className='radio-inputs <md:w-full'>
      {radioList.map((radio, index) => (
        <label
          className={cs('radio', {
            'font-semibold': radio.key === activeKey,
            'bg-white': radio.key === activeKey,
          })}
          key={index}
          onClick={() => setActiveKey(radio.key)}>
          <input type='radio' name='radio' />
          <span className='name'>{radio.name}</span>
        </label>
      ))}
    </div>
  );
};

export default Radio;
