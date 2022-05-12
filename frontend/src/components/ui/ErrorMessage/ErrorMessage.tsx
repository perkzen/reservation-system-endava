import React, { FC } from 'react';
import classes from './ErrorMessage.module.scss';

interface ErrorMessageProps {
  error: string;
}

const ErrorMessage: FC<ErrorMessageProps> = ({ error }) => {
  return <div className={classes.Container}>{error}</div>;
};

export default ErrorMessage;
