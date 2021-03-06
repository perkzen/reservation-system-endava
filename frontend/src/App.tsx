import React from 'react';
import { Router } from './components/pages/Router/Router';
import ModalProvider from './components/ui/ModalProvider/ModalProvider';
import LanguageProvider from './components/ui/LanguageProvider/LanguageProvider';
import NotificationProvider from './components/ui/NotificationProvider/NotificationProvider';
import AuthProvider from './components/ui/AuthProvider/AuthProvider';
import RedirectionProvider from './components/ui/RedirectionProvider/RedirectionProvider';

function App() {
  return (
    <LanguageProvider>
      <NotificationProvider>
        <ModalProvider>
          <AuthProvider>
            <RedirectionProvider>
              <Router />
            </RedirectionProvider>
          </AuthProvider>
        </ModalProvider>
      </NotificationProvider>
    </LanguageProvider>
  );
}

export default App;
