import React, { FC, ReactNode } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

interface NotificationProviderProps {
  children: ReactNode;
}

const NotificationProvider: FC<NotificationProviderProps> = ({ children }) => {
  return (
    <>
      {children}
      <ToastContainer />
    </>
  );
};

export default NotificationProvider;
