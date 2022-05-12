import React, { FC, Fragment } from 'react';
import classes from './NavbarDialog.module.scss';
import { XCircleIcon } from '@heroicons/react/outline';
import { Dialog, Transition } from '@headlessui/react';
import { Routes } from 'react-router-dom';
import Logo from '../Logo/Logo';

interface NavbarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const NavbarDialog: FC<NavbarProps> = ({ sidebarOpen, setSidebarOpen }) => {
  return (
    <Transition.Root show={false} as={Fragment}>
      <Dialog as="div" className={classes.Dialog} onClose={setSidebarOpen}>
        <Transition.Child
          as={Fragment}
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Dialog.Overlay className={classes.DialogOverlay} />
        </Transition.Child>
        <Transition.Child
          as={Fragment}
          enter="transition ease-in-out duration-300 transform"
          enterFrom="-translate-x-full"
          enterTo="translate-x-0"
          leave="transition ease-in-out duration-300 transform"
          leaveFrom="translate-x-0"
          leaveTo="-translate-x-full"
        >
          <div className={classes.Container}>
            <Transition.Child
              as={Fragment}
              enter="ease-in-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in-out duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className={classes.ButtonContainer}>
                <button type="button" onClick={() => setSidebarOpen(false)}>
                  <span>Close sidebar</span>
                  <XCircleIcon className={classes.Icon} aria-hidden="true" />
                </button>
              </div>
            </Transition.Child>
            <div className={classes.NavContainer}>
              <Logo className={classes.LogoContainer} />
              <Routes />
            </div>
            {/*<Profile />*/}
          </div>
        </Transition.Child>
        <div className={classes.Shrink} aria-hidden="true">
          {/* Force sidebar to shrink to fit close icon */}
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default NavbarDialog;
