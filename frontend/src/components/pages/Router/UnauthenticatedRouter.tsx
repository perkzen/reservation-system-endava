import React, { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import { routes } from '../../../routes';
import Login from '../Login/Login';
import Register from '../Register/Register';
import PageNotFound from '../PageNotFound/PageNotFound';

export const UnauthenticatedRouter: FC = () => {
  return (
    <Routes>
      <Route path={routes.LOGIN} element={<Login />} />
      <Route path={routes.REGISTER} element={<Register />} />
      <Route path={routes.PAGE_NOT_FOUND} element={<PageNotFound />} />
    </Routes>
  );
};
