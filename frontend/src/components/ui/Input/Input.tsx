import React, { forwardRef, HTMLProps } from 'react';
import { FieldError } from 'react-hook-form';
import classes from './Input.module.scss';
import { classNames } from '../../../utils/classNames';

interface InputProps extends HTMLProps<HTMLInputElement> {
  error?: FieldError;
  className?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ error, className = '', ...props }, ref) => {
    return (
      <div className={classes.Container}>
        <input
          {...props}
          ref={ref}
          className={classNames(className, error ? classes.InputError : '')}
        />
        {error && <small>{error.message}</small>}
      </div>
    );
  }
);

export default Input;
