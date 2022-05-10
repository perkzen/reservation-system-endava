import React from 'react';
import AuthenticatedRouter from './AuthenticatedRouter';
import { UnauthenticatedRouter } from './UnauthenticatedRouter';

export const Router = () => {
  const isAuthenticated = true;

  return isAuthenticated ? <AuthenticatedRouter /> : <UnauthenticatedRouter />;
};
