import React, { FC, ReactNode, useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../../firebase-config';
import { setAccessToken, setUser } from '../../../store/features/userSlice';
import { useAppDispatch } from '../../../store/app/hooks';
import { FirebaseUser } from '../../../store/models/User';
import LoadingPage from '../../pages/LoadingPage/LoadingPage';

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (loggedUser) => {
      if (loggedUser !== null) {
        const accessToken = await loggedUser.getIdToken(true);
        const user = loggedUser as FirebaseUser;
        dispatch(setUser(user));
        dispatch(setAccessToken(accessToken));
      }

      setLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, [dispatch]);

  return !loading ? <>{children}</> : <LoadingPage />;
};

export default AuthProvider;
