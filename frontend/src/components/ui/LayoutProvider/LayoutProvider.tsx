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
      <main>
        <div className="py-6">
          <div className="mx-auto px-4 sm:px-6 md:px-8">
            <div className="py-4">{children}</div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LayoutProvider;
