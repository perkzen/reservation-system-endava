import React from 'react';
import classes from './Profile.module.scss';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../../../store/app/hooks';
import { signOut } from 'firebase/auth';
import { auth } from '../../../../firebase-config';

const Profile = () => {
  const { user } = useAppSelector((state) => state.user);

  const logout = async () => {
    await signOut(auth);
  };

  return (
    <div className={classes.Container}>
      <Link to={''} className={classes.Link}>
        <div className={classes.Flex}>
          <img src={user?.photoURL} alt="Profile" />
          <div>
            <p>{user?.email}</p>
            <p onClick={logout}>Logout</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Profile;
