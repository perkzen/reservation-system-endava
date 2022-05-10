import React, { FC } from 'react';
import { routes } from '../../../routes';
import { Route, Routes } from 'react-router-dom';
import Home from '../Home/Home';

const AuthenticatedRouter: FC = () => {
  return (
    <Routes>
      <Route path={routes.HOME} element={<Home />} />
    </Routes>
  );
};

export default AuthenticatedRouter;
