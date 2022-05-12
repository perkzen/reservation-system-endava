import React, { FC } from 'react';
import classes from './ErrorMessage.module.scss';
import { Errors } from '../../../constants/errorConstants';

interface ErrorMessageProps {
  error?: Errors;
}

const ErrorMessage: FC<ErrorMessageProps> = ({ error }) => {
  return <div className={classes.Container}>{error}</div>;
};

export default ErrorMessage;
