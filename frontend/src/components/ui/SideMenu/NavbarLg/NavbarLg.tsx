import React, { FC } from 'react';
import classes from './NavbarLg.module.scss';
import Navigation from '../Navigation/Navigation';
import Logo from '../Logo/Logo';

const NavbarLg: FC = () => {
  return (
    <>
      {/* Static sidebar for desktop */}
      <div className={classes.Wrapper}>
        <div className={classes.Container}>
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className={classes.Sidebar}>
            <div className={classes.NavContainer}>
              <Logo className={classes.LogoContainer} />
              <Navigation />
            </div>
            {/*<Profile />*/}
          </div>
        </div>
      </div>
    </>
  );
};

export default NavbarLg;
