import React, { FC, useState } from 'react';
import NavbarLg from './NavbarLg/NavbarLg';
import NavbarSm from './NavbarSm/NavbarSm';
import NavbarDialog from './NavbarDialog/NavbarDialog';

const SideMenu: FC = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <NavbarLg />
      <NavbarSm setSidebarOpen={setOpen} />
      <NavbarDialog sidebarOpen={open} setSidebarOpen={setOpen} />
    </>
  );
};

export default SideMenu;
