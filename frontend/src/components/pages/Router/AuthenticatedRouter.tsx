import React, { FC } from 'react';
import { layoutRoutes, routes } from '../../../routes';
import { Route, Routes } from 'react-router-dom';
import LayoutProvider from '../../ui/LayoutProvider/LayoutProvider';
import PageNotFound from '../PageNotFound/PageNotFound';
import { v4 } from 'uuid';

const AuthenticatedRouter: FC = () => {
  return (
    <>
      <Routes>
        {layoutRoutes.map((route) => (
          <Route
            key={v4()}
            path={route.path}
            element={<LayoutProvider>{route.element}</LayoutProvider>}
          />
        ))}
        <Route path={routes.PAGE_NOT_FOUND} element={<PageNotFound />} />
      </Routes>
    </>
  );
};

export default AuthenticatedRouter;
