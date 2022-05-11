import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import translation from './en/translation.json';

export const resources = {
  en: {
    translation,
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
