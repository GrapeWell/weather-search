import './index.css';
import { Props } from './types';
import { IoSearchOutline } from 'react-icons/io5';
import { useTranslation } from 'react-i18next';

const SearchInput: React.FC<Props> = ({ onSearch }) => {
  const { t } = useTranslation();
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
        placeholder={t('搜索城市名称')}
        onKeyDown={handleKeyPress}
      />
    </div>
  );
};

export default SearchInput;
