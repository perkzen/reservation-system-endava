import React, { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import { routes } from '../../../routes';
import Login from '../Login/Login';
import Register from '../Register/Register';
import PageNotFound from '../PageNotFound/PageNotFound';
import ForgotPassword from '../ForgotPasswordPage/ForgotPassword';
import ResetPassword from '../ResetPasswordPage/ResetPassword';
import { useTranslation } from 'react-i18next';

export const UnauthenticatedRouter: FC = () => {
  const { t } = useTranslation();

  return (
    <Routes>
      <Route path={routes.LOGIN} element={<Login />} />
      <Route path={routes.REGISTER} element={<Register />} />
      <Route path={routes.FORGOT_PASSWORD} element={<ForgotPassword />} />
      <Route path={routes.RESET_PASSWORD} element={<ResetPassword />} />
      <Route
        path={routes.PAGE_NOT_FOUND}
        element={
          <PageNotFound
            heading={t('page_not_found')}
            info={t('please_check_url')}
          />
        }
      />
    </Routes>
  );
};
