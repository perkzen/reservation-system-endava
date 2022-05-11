import React, { forwardRef, HTMLProps } from 'react';
import { FieldError } from 'react-hook-form';
import classes from './Input.module.scss';
import { classNames } from '../../../utils/classNames';

interface InputProps extends HTMLProps<HTMLInputElement> {
  errors?: FieldError;
  className?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ errors, className = '', ...props }, ref) => {
    return (
      <input
        {...props}
        ref={ref}
        className={classNames(className, classes.Container)}
      />
    );
  }
);

export default Input;
