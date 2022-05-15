import React, { FC, ReactNode, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../../firebase-config';
import { useAppDispatch, useAppSelector } from '../../../store/app/hooks';
import { setUser } from '../../../store/features/userSlice';
import { User } from '../../../store/models/User';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../../routes';

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.user);
  const isAuthenticated = !!user;

  onAuthStateChanged(auth, (loggedUser) => {
    const user = loggedUser as unknown as User;
    dispatch(setUser(user));
  });

  useEffect(() => {
    if (isAuthenticated) navigate(routes.HOME);
  }, [isAuthenticated, navigate]);

  return <>{children}</>;
};

export default AuthProvider;
