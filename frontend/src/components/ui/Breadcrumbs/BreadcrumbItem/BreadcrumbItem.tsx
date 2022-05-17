import React, { FC } from 'react';
import classes from './BreadcrumbItem.module.scss';
import { ChevronRightIcon } from '@heroicons/react/solid';
import { Link } from 'react-router-dom';

export interface Breadcrumb {
  name: string;
  link: string;
  active: boolean;
}

const BreadcrumbItem: FC<Breadcrumb> = ({ name, link, active }) => {
  return (
    <li className={classes.Container}>
      <ChevronRightIcon aria-hidden="true" />
      <Link
        to={link}
        className={classes.Link}
        aria-current={active ? 'page' : undefined}
      >
        {name}
      </Link>
    </li>
  );
};

export default BreadcrumbItem;
