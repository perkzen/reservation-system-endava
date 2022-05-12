import React, { FC } from 'react';
import { routes } from '../../../routes';
import { Route, Routes } from 'react-router-dom';
import Home from '../Home/Home';
import LayoutProvider from '../../ui/LayoutProvider/LayoutProvider';

const AuthenticatedRouter: FC = () => {
  return (
    <LayoutProvider>
      <Routes>
        <Route path={routes.HOME} element={<Home />} />
      </Routes>
    </LayoutProvider>
  );
};

export default AuthenticatedRouter;
