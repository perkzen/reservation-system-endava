import React, { FC, ReactNode } from 'react';
import classes from './LayoutProvider.module.scss';
import SideMenu from '../SideMenu/SideMenu';

interface LayoutProps {
  children: ReactNode;
}

const LayoutProvider: FC<LayoutProps> = ({ children }) => {
  return (
    <div className={classes.Container}>
      <SideMenu />
      <main>{children}</main>
    </div>
  );
};

export default LayoutProvider;
