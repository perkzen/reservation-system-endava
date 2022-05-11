import React, { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import { routes } from '../../../routes';
import Home from '../Home/Home';
import PageNotFound from '../PageNotFound/PageNotFound';
import Login from '../Login/Login';
import Register from '../Register/Register';

export const UnauthenticatedRouter: FC = () => {
  return (
    <Routes>
      <Route path={routes.LOGIN} element={<Login />} />
      <Route path={routes.REGISTER} element={<Register />} />
      <Route path={routes.HOME} element={<Home />} />
      <Route path={routes.PAGE_NOT_FOUND} element={<PageNotFound />} />
      {/*<Route path={"*"} element={<Login />} />*/}
    </Routes>
  );
};
