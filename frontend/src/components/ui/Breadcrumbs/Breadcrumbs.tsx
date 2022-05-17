import React, { FC } from 'react';
import classes from './Breadcrumb.module.scss';
import { HomeIcon } from '@heroicons/react/solid';
import { routes } from '../../../routes';
import { Link } from 'react-router-dom';
import BreadcrumbItem, { Breadcrumb } from './BreadcrumbItem/BreadcrumbItem';

const Breadcrumbs: FC = () => {
  const pages: Breadcrumb[] = [
    { name: 'Maribor', link: '#', active: false },
    { name: 'Workspace 1', link: '#', active: true },
  ];
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
        {pages.map(({ name, link, active }) => (
          <BreadcrumbItem key={name} name={name} link={link} active={active} />
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
