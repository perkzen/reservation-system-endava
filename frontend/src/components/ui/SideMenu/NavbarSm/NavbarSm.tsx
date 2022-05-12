import React, { FC } from 'react';
import classes from './NavbarSm.module.scss';
import { MenuIcon } from '@heroicons/react/solid';
import Logo from '../Logo/Logo';

interface NavbarProps {
  setSidebarOpen: (open: boolean) => void;
}

const NavbarSm: FC<NavbarProps> = ({ setSidebarOpen }) => {
  return (
    <div className={classes.Wrapper}>
      <div className={classes.Container}>
        <Logo />
        <div>
          <button type="button" onClick={() => setSidebarOpen(true)}>
            <span>Open sidebar</span>
            <MenuIcon className={classes.MenuIcon} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default NavbarSm;
