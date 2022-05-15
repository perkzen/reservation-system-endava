import React, { FC, ReactNode, useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../../firebase-config';
import { setUser } from '../../../store/features/userSlice';
import { useAppDispatch } from '../../../store/app/hooks';
import { User } from '../../../store/models/User';

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (loggedUser) => {
      const user = loggedUser as unknown as User;
      if (user?.accessToken !== undefined) {
        console.log(user);
        dispatch(setUser(user));
      }
      setLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, [dispatch]);

  return !loading ? <>{children}</> : <>...loading</>;
};

export default AuthProvider;
