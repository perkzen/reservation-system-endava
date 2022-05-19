import React, { forwardRef, HTMLProps } from 'react';
import { FieldError } from 'react-hook-form';
import classes from './Input.module.scss';
import { classNames } from '../../../utils/classNames';

interface InputProps extends HTMLProps<HTMLInputElement> {
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
          type="text"
          placeholder={' '}
          ref={ref}
          name={'name'}
          className={classNames(className, error ? classes.InputError : '')}
        />
        <label htmlFor={'name'}>{label}</label>
        {error && <small>{error.message}</small>}
      </div>
    );
  }
);

export default Input;
