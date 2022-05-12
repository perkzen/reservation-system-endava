import React, { FC } from 'react';
import AuthenticatedRouter from './AuthenticatedRouter';
import { UnauthenticatedRouter } from './UnauthenticatedRouter';

export const Router: FC = () => {
  const isAuthenticated = false;

  return isAuthenticated ? <AuthenticatedRouter /> : <UnauthenticatedRouter />;
};
