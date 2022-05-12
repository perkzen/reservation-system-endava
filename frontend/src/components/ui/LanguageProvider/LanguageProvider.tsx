import React, { FC, ReactNode } from 'react';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translationsEn from '../../../i18n/en/translations.json';

interface ProviderProps {
  children: ReactNode;
}

const LanguageProvider: FC<ProviderProps> = ({ children }) => {
  i18n.use(initReactI18next).init({
    resources: {
      en: { translation: translationsEn },
    },
    lng: 'en',
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
  });

  return <>{children}</>;
};

export default LanguageProvider;
