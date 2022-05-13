import React, { FC } from 'react';
import AuthenticatedRouter from './AuthenticatedRouter';
import { UnauthenticatedRouter } from './UnauthenticatedRouter';

export const Router: FC = () => {
  const isAuthenticated = true;

  return isAuthenticated ? <AuthenticatedRouter /> : <UnauthenticatedRouter />;
};
