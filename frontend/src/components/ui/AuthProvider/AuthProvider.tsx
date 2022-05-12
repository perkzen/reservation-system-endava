import React, { FC, ReactNode } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../../firebase-config';
import { useAppDispatch } from '../../../store/app/hooks';
import { login } from '../../../store/features/authSlice';
import { User } from '../../../store/models/Auth';

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const dispatch = useAppDispatch();

  onAuthStateChanged(auth, (loggedUser) => {
    const user = loggedUser as unknown as User;
    dispatch(login(user));
  });

  return <>{children}</>;
};

export default AuthProvider;
