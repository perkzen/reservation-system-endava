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
      <div className={classes.Test}>
        <ChevronRightIcon />
      </div>
      {active ? (
        <span className={classes.Link}>{name}</span>
      ) : (
        <Link to={link} className={classes.Link}>
          {name}
        </Link>
      )}
    </li>
  );
};

export default BreadcrumbItem;
