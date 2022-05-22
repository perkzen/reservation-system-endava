import React, { FC } from 'react';
import classes from './BreadcrumbItem.module.scss';
import { ChevronRightIcon } from '@heroicons/react/solid';
import { Link } from 'react-router-dom';

export interface Breadcrumb {
  name: string;
  link: string;
}

const BreadcrumbItem: FC<Breadcrumb> = ({ name, link }) => {
  return (
    <li className={classes.Container}>
      <ChevronRightIcon />
      <Link to={link} className={classes.Link}>
        {name}
      </Link>
    </li>
  );
};

export default BreadcrumbItem;
