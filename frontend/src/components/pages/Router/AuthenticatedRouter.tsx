import React, { FC } from 'react';
import { adminRoutes, protectedRoutes, routes } from '../../../routes';
import { Route, Routes } from 'react-router-dom';
import LayoutProvider from '../../ui/LayoutProvider/LayoutProvider';
import PageNotFound from '../PageNotFound/PageNotFound';
import { v4 } from 'uuid';
import ProtectedRoute from '../../ui/ProtectedRoute/ProtectedRoute';
import { useAppSelector } from '../../../store/app/hooks';
import { Role } from '../../../store/models/User';
import { useTranslation } from 'react-i18next';

const AuthenticatedRouter: FC = () => {
  const { details } = useAppSelector((state) => state.user);
  const { t } = useTranslation();

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
        <Route
          path={routes.OFFICE_NOT_FOUND}
          element={
            <PageNotFound
              heading={t('office_not_found')}
              info={t('please_check_url')}
            />
          }
        />
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
    </>
  );
};

export default AuthenticatedRouter;
