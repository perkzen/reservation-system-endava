import React, { FC, ReactNode, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../../store/app/hooks';

interface RedirectionProviderProps {
  children: ReactNode;
}

const RedirectionProvider: FC<RedirectionProviderProps> = ({ children }) => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const historyState: { fromLogin: boolean } = state as any;
  const { details } = useAppSelector((state) => state.user);

  useEffect(() => {
    if (!historyState) return;
    if (details && details.redirectOnLogin && historyState.fromLogin) {
      navigate(
        `/${details!.primaryOffice.location}/${details!.primaryOffice._id}`,
        { state: details!.primaryOffice.name }
      );
    }
  }, [details]);

  return <>{children}</>;
};

export default RedirectionProvider;
