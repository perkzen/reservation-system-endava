import React, { Fragment } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../store/app/hooks';
import { signOut } from 'firebase/auth';
import { auth } from '../../../../firebase-config';
import { useTranslation } from 'react-i18next';
import { removeUser } from '../../../../store/features/userSlice';
import { routes } from '../../../../routes';
import { Menu, Transition } from '@headlessui/react';
import { classNames } from '../../../../utils/classNames';
import { v4 } from 'uuid';

interface UserNavigation {
  name: string;
  path?: routes;
  onClick?: () => void;
}

const ProfileMenu = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const logout = () => {
    signOut(auth).then(() => {
      dispatch(removeUser());
      navigate(routes.LOGIN);
    });
  };

  const userNavigation: UserNavigation[] = [
    { name: 'Your Profile', path: routes.PROFILE },
    { name: 'Settings', path: routes.PAGE_NOT_FOUND },
    { name: 'Logout', onClick: logout },
  ];

  return (
    <div className="flex-1 px-4 flex justify-between">
      <div className="flex-1 flex" />
      <div className="ml-4 flex items-center md:ml-6">
        {/* ProfileMenu dropdown */}
        <Menu as="div" className="ml-3 relative">
          <div>
            <Menu.Button className="max-w-xs bg-white flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
              <span className="sr-only">Open user menu</span>
              <img
                className="h-8 w-8 rounded-full"
                src="https://avatars.dicebear.com/api/initials/domenperko.svg"
                alt=""
              />
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
              {userNavigation.map((item) => (
                <Menu.Item key={v4()}>
                  {({ active }) => (
                    <Link
                      to={item.path ? item.path : ''}
                      onClick={item.onClick}
                      className={classNames(
                        active ? 'bg-gray-100' : '',
                        'block px-4 py-2 text-sm text-gray-700'
                      )}
                    >
                      {item.name}
                    </Link>
                  )}
                </Menu.Item>
              ))}
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </div>
  );
};

export default ProfileMenu;