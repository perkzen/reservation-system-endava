import React from 'react';
import { Router } from './components/pages/Router/Router';
import ModalProvider from './components/ui/ModalProvider/ModalProvider';
import AuthProvider from './components/ui/AuthProvider/AuthProvider';
import LanguageProvider from './components/ui/LanguageProvider/LanguageProvider';

function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <ModalProvider>
          <Router />
        </ModalProvider>
      </AuthProvider>
    </LanguageProvider>
  );
}

export default App;
