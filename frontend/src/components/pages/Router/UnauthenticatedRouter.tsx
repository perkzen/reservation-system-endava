import React, { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import { routes } from '../../../routes';
import Home from '../Home/Home';
import PageNotFound from '../PageNotFound/PageNotFound';

export const UnauthenticatedRouter: FC = () => {
  return (
    <Routes>
      <Route path={routes.HOME} element={<Home />} />
      <Route path={routes.PAGE_NOT_FOUND} element={<PageNotFound />} />
      {/*<Route path={"*"} element={<Login />} />*/}
    </Routes>
  );
};
