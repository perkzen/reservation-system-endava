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
          <div className={classes.Content}>
            {/* Replace with your content */}
            <div className="py-4">{children}</div>
            {/* /End replace */}
          </div>
        </div>
      </main>
    </div>
  );
};

export default LayoutProvider;
