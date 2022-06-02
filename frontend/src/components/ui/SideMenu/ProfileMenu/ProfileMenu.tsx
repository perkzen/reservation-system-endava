import React, { Fragment } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../store/app/hooks';
import { signOut } from 'firebase/auth';
import { auth } from '../../../../firebase-config';
import { removeUser } from '../../../../store/features/userSlice';
import { routes } from '../../../../routes';
import { Menu, Transition } from '@headlessui/react';
import { classNames } from '../../../../utils/classNames';
import { v4 } from 'uuid';
import { Role } from '../../../../store/models/User';
import LoadingSpinner from '../../LoadingSpinner/LoadingSpinner';
import { UserIcon } from '@heroicons/react/solid';
import { useTranslation } from 'react-i18next';

interface UserNavigation {
  name: string;
  path?: routes;
  onClick?: () => void;
}

const ProfileMenu = () => {
  const dispatch = useAppDispatch();
  const { details, user } = useAppSelector((state) => state.user);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const logout = () => {
    signOut(auth).then(() => {
      dispatch(removeUser());
      navigate(routes.LOGIN);
    });
  };

  const adminNavigation: UserNavigation[] = [
    { name: 'Your profile', path: routes.PROFILE },
    { name: 'Admin dashboard', path: routes.DASHBOARD },
    { name: 'Settings', path: routes.SETTINGS },
    { name: 'Logout', onClick: logout },
  ];

  const userNavigation: UserNavigation[] = [
    { name: 'Your profile', path: routes.PROFILE },
    { name: 'My reservations', path: routes.HOME },
    { name: 'Logout', onClick: logout },
  ];

  return (
    <div className="flex-1 px-4 flex justify-between">
      <div className="flex-1 flex" />
      <div className="ml-4 flex items-center md:ml-6">
        {/* ProfileMenu dropdown */}
        <Menu as="div" className="relative">
          <div>
            {!user ? (
              <LoadingSpinner />
            ) : (
              <Menu.Button className="max-w-xs bg-white flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                <span className="sr-only">{t('open_user_menu')}</span>
                {details ? (
                  <img
                    className="w-8 rounded-full"
                    src={`https://avatars.dicebear.com/api/initials/${details?.firstname}_${details?.surname}.svg`}
                    alt="profile"
                  />
                ) : (
                  <UserIcon
                    className={'text-neutral-700'}
                    width={32}
                    height={32}
                  />
                )}
              </Menu.Button>
            )}
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
              {details?.role === Role.ADMIN ? (
                <>
                  {adminNavigation.map((item) => (
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
                </>
              ) : (
                <>
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
                </>
              )}
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </div>
  );
};

export default ProfileMenu;
