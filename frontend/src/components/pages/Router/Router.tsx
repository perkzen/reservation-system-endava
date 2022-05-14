import React, { FC } from 'react';
import AuthenticatedRouter from './AuthenticatedRouter';
import { UnauthenticatedRouter } from './UnauthenticatedRouter';
import { useAppSelector } from '../../../store/app/hooks';

export const Router: FC = () => {
  const { user } = useAppSelector((state) => state.user);
  const isAuthenticated = !!user;

  return isAuthenticated ? <AuthenticatedRouter /> : <UnauthenticatedRouter />;
};
