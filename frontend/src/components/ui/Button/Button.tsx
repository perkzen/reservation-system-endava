import React, { FC, ReactNode } from 'react';
import classes from './Button.module.scss';
import { classNames } from '../../../utils/classNames';

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
}

const Button: FC<ButtonProps> = ({ children, onClick, className = '' }) => {
  return (
    <button
      className={classNames(className, classes.Container)}
      onClick={onClick}
      type={'submit'}
    >
      {children}
    </button>
  );
};

export default Button;
