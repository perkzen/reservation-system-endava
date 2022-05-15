import React, { FC } from 'react';
import { useAppSelector } from '../../../store/app/hooks';
import { Navigate } from 'react-router-dom';
import { routes } from '../../../routes';

interface AuthProviderProps {
  children: JSX.Element;
}

const ProtectedRoute: FC<AuthProviderProps> = ({ children }) => {
  const { isAuth } = useAppSelector((state) => state.user);

  if (!isAuth) return <Navigate to={routes.LOGIN} />;

  return children;
};

export default ProtectedRoute;
