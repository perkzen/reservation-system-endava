import React, { forwardRef, HTMLProps } from 'react';
import { FieldError } from 'react-hook-form';
import classes from './Input.module.scss';
import { classNames } from '../../../utils/classNames';

export interface InputProps extends HTMLProps<HTMLInputElement> {
  error?: FieldError;
  className?: string;
  label: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ error, className = '', label, ...props }, ref) => {
    return (
      <div className={classes.Container}>
        <input
          {...props}
          placeholder={' '}
          ref={ref}
          className={classNames(className, error ? classes.InputError : '')}
        />
        <label>{label}</label>
        {error && <small>{error.message}</small>}
      </div>
    );
  }
);

export default Input;
