import React, { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import { routes } from '../../../routes';
import Login from '../Login/Login';
import Register from '../Register/Register';
import PageNotFound from '../PageNotFound/PageNotFound';
import ForgotPassword from '../ForgotPasswordPage/ForgotPassword';
import ResetPassword from '../ResetPasswordPage/ResetPassword';

export const UnauthenticatedRouter: FC = () => {
  return (
    <Routes>
      <Route path={routes.LOGIN} element={<Login />} />
      <Route path={routes.REGISTER} element={<Register />} />
      <Route path={routes.FORGOT_PASSWORD} element={<ForgotPassword />} />
      <Route path={routes.RESET_PASSWORD} element={<ResetPassword />} />
      <Route path={routes.PAGE_NOT_FOUND} element={<PageNotFound />} />
    </Routes>
  );
};
