import React from 'react';
import classes from './Profile.module.scss';
import { Link } from 'react-router-dom';

const Profile = () => {
  return (
    <div className={classes.Container}>
      <Link to={''} className={classes.Link}>
        <div className={classes.Flex}>
          <img src={''} alt="Profile" />
          <div>
            <p>{'Domen Perko'}</p>
            <p>View profile</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Profile;
