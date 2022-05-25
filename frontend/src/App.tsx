import React from 'react';
import { Router } from './components/pages/Router/Router';
import ModalProvider from './components/ui/ModalProvider/ModalProvider';
import LanguageProvider from './components/ui/LanguageProvider/LanguageProvider';
import NotificationProvider from './components/ui/NotificationProvider/NotificationProvider';

function App() {
  return (
    <LanguageProvider>
      <NotificationProvider>
        <ModalProvider>
          <Router />
        </ModalProvider>
      </NotificationProvider>
    </LanguageProvider>
  );
}

export default App;
