import React, { FC } from 'react';
import { layoutRoutes, routes } from '../../../routes';
import { Route, Routes } from 'react-router-dom';
import LayoutProvider from '../../ui/LayoutProvider/LayoutProvider';
import PageNotFound from '../PageNotFound/PageNotFound';
import { v4 } from 'uuid';
import ProtectedRoute from '../../ui/ProtectedRoute/ProtectedRoute';
import Login from '../Login/Login';
import Register from '../Register/Register';

const AuthenticatedRouter: FC = () => {
  return (
    <>
      <Routes>
        {layoutRoutes.map((route) => (
          <Route
            key={v4()}
            path={route.path}
            element={
              <ProtectedRoute>
                <LayoutProvider>{route.element}</LayoutProvider>
              </ProtectedRoute>
            }
          />
        ))}
        <Route path={routes.LOGIN} element={<Login />} />
        <Route path={routes.REGISTER} element={<Register />} />
        <Route path={routes.PAGE_NOT_FOUND} element={<PageNotFound />} />
      </Routes>
    </>
  );
};

export default AuthenticatedRouter;
