import React from 'react';
import { useTranslation } from 'react-i18next';

const lngs = {
  en: { nativeName: '英文' },
  cn: { nativeName: '中文' },
};

type LngKey = keyof typeof lngs;

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();

  return (
    <div className='flex items-center space-x-2'>
      {Object.keys(lngs).map((lng) => (
        <button
          key={lng}
          type='submit'
          onClick={() => i18n.changeLanguage(lng)}
          className={`text-xs px-2 py-1 rounded transition-colors ${
            i18n.resolvedLanguage === lng
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}>
          {lngs[lng as LngKey].nativeName}
        </button>
      ))}
    </div>
  );
};

export default LanguageSwitcher;
