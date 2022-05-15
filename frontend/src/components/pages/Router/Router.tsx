import React, { FC } from 'react';
import AuthenticatedRouter from './AuthenticatedRouter';
import { UnauthenticatedRouter } from './UnauthenticatedRouter';
import { useAppSelector } from '../../../store/app/hooks';

export const Router: FC = () => {
  const { isAuth } = useAppSelector((state) => state.user);

  return isAuth ? <AuthenticatedRouter /> : <UnauthenticatedRouter />;
};
