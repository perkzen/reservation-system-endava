import React, { FC } from 'react';
import classes from './Breadcrumb.module.scss';
import { HomeIcon } from '@heroicons/react/solid';
import { routes } from '../../../routes';
import { Link, useLocation } from 'react-router-dom';
import BreadcrumbItem, { Breadcrumb } from './BreadcrumbItem/BreadcrumbItem';
import { v4 } from 'uuid';

const Breadcrumbs: FC = () => {
  const { pathname, state } = useLocation();

  const paths = pathname.split('/').slice(1, pathname.length);

  const pages: Breadcrumb[] = paths.map((item, index) => {
    if (index === paths.length - 1 && state)
      return { name: state as string, link: '' };
    return { name: item, link: '' };
  });

  return (
    <nav className={classes.Container} aria-label="breadcrumb">
      <ol>
        <li>
          <div>
            <Link to={routes.HOME} className={classes.Link}>
              <HomeIcon aria-hidden="true" />
              <span className="sr-only">Home</span>
            </Link>
          </div>
        </li>
        <>
          {pages.map(({ name, link }) => (
            <BreadcrumbItem key={v4()} name={name} link={link} />
          ))}
        </>
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
