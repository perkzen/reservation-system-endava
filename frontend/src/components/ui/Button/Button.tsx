import React, { FC, ReactNode } from 'react';
import classes from './Button.module.scss';
import { classNames } from '../../../utils/classNames';
import ButtonLoadingSpinner from './ButtonLoadingSpinner/ButtonLoadingSpinner';

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  loading?: boolean;
}

const Button: FC<ButtonProps> = ({
  children,
  onClick,
  className = '',
  disabled,
  loading,
}) => {
  return (
    <button
      disabled={disabled}
      className={classNames(className, classes.Container)}
      onClick={onClick}
      type={'submit'}
    >
      {loading && <ButtonLoadingSpinner />}
      {children}
    </button>
  );
};

export default Button;
