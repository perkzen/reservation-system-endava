import React, { FC, ReactNode } from 'react';
import classes from './Card.module.scss';
import { classNames } from '../../../utils/classNames';

interface CardProps {
  children: ReactNode;
  title?: string;
  className?: string;
}

const Card: FC<CardProps> = ({ children, title, className = '' }) => {
  return (
    <div className={classNames(className, classes.Container)}>
      <h1>{title}</h1>
      {children}
    </div>
  );
};

export default Card;
