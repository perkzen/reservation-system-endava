import React from 'react';
import classes from './Profile.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../store/app/hooks';
import { signOut } from 'firebase/auth';
import { auth } from '../../../../firebase-config';
import { useTranslation } from 'react-i18next';
import { removeUser } from '../../../../store/features/userSlice';
import { routes } from '../../../../routes';

const Profile = () => {
  const { user } = useAppSelector((state) => state.user);
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const logout = () => {
    signOut(auth).then(() => {
      dispatch(removeUser());
      navigate(routes.LOGIN);
    });
  };

  return (
    <div className={classes.Container}>
      <Link to={''} className={classes.Link}>
        <div className={classes.Flex}>
          <img src={user?.photoURL} alt="Profile" />
          <div>
            <p>{user?.email}</p>
            <p onClick={logout}>{t('logout')}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Profile;
