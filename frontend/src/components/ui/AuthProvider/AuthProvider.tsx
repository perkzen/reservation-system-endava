import React, { FC, ReactNode } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../../firebase-config';
import { useAppDispatch } from '../../../store/app/hooks';
import { setUser } from '../../../store/features/userSlice';
import { User } from '../../../store/models/User';

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const dispatch = useAppDispatch();

  onAuthStateChanged(auth, (loggedUser) => {
    const user = loggedUser as unknown as User;
    dispatch(setUser(user));
  });

  return <>{children}</>;
};

export default AuthProvider;
