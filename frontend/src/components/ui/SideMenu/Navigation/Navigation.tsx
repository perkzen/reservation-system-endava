import React, { FC } from 'react';
import classes from './Navigation.module.scss';
import { Link, useLocation } from 'react-router-dom';
import { classNames } from '../../../../utils/classNames';
import { navigation } from '../../../../routes';

const Navigation: FC = () => {
  const { pathname } = useLocation();

  return (
    <nav className={classes.NavLinkContainer}>
      {navigation.map((item) => (
        <Link
          key={item.name}
          to={item.path}
          className={classNames(
            item.path === pathname ? classes.Active : classes.NotActive,
            classes.Link
          )}
        >
          {item.name}
        </Link>
      ))}
    </nav>
  );
};

export default Navigation;
