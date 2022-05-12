import React, { FC } from 'react';
import classes from './ErrorMessage.module.scss';

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: FC<ErrorMessageProps> = ({ message }) => {
  return <div className={classes.Container}>{message}</div>;
};

export default ErrorMessage;
