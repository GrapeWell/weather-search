import './index.less';
import { Props } from './types';
import { IoSearchOutline } from 'react-icons/io5';

const SearchInput: React.FC<Props> = ({ onSearch }) => {
  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      onSearch((event.target as HTMLInputElement).value);
    }
  };

  return (
    <div className='group w-full max-w-sm'>
      <IoSearchOutline className='icon' />
      <input
        className='input'
        type='search'
        placeholder='搜索城市名称'
        onKeyDown={handleKeyPress}
      />
    </div>
  );
};

export default SearchInput;
