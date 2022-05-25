import React, { FC } from 'react';
import { adminRoutes, protectedRoutes, routes } from '../../../routes';
import { Route, Routes } from 'react-router-dom';
import LayoutProvider from '../../ui/LayoutProvider/LayoutProvider';
import PageNotFound from '../PageNotFound/PageNotFound';
import { v4 } from 'uuid';
import ProtectedRoute from '../../ui/ProtectedRoute/ProtectedRoute';
import Login from '../Login/Login';
import Register from '../Register/Register';
import { useAppSelector } from '../../../store/app/hooks';
import { Role } from '../../../store/models/User';
import ForgotPassword from '../ForgotPasswordPage/ForgotPassword';
import ResetPassword from '../ResetPasswordPage/ResetPassword';

const AuthenticatedRouter: FC = () => {
  const { details } = useAppSelector((state) => state.user);

  return (
    <>
      <Routes>
        {protectedRoutes.map((route) => (
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
        {details?.role === Role.ADMIN && (
          <>
            {adminRoutes.map((route) => (
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
          </>
        )}
        <Route path={routes.LOGIN} element={<Login />} />
        <Route path={routes.REGISTER} element={<Register />} />
        <Route path={routes.FORGOT_PASSWORD} element={<ForgotPassword />} />
        <Route path={routes.RESET_PASSWORD} element={<ResetPassword />} />
        <Route path={routes.PAGE_NOT_FOUND} element={<PageNotFound />} />
      </Routes>
    </>
  );
};

export default AuthenticatedRouter;
