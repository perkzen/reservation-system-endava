import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import translations from './en/translations.json';

export const resources = {
  en: {
    translations,
  },
} as const;

i18next.use(initReactI18next).init({
  lng: 'en',
  fallbackLng: 'en',
  saveMissing: true,
  missingKeyHandler: (language, namespace, key) =>
    console.error(`Missing translation key: ${key}`),
  resources,
});
