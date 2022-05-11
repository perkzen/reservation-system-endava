import React from 'react';
import { Router } from './components/pages/Router/Router';
import ModalProvider from './components/ui/ModalProvider/ModalProvider';
import { initReactI18next } from 'react-i18next';
import i18n from 'i18next';
import translationsEn from './i18n/en/translations.json';

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: translationsEn },
  },
  lng: 'en',
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
});

function App() {
  return (
    <ModalProvider>
      <Router />
    </ModalProvider>
  );
}

export default App;
