import React from 'react';
import classes from './LoadingSpinner.module.scss';
import loading from '../../../assets/loading.gif';

const LoadingSpinner = () => {
  return (
    <div className={classes.Container}>
      <img src={loading} alt="Loading spinner" />
    </div>
  );
};

export default LoadingSpinner;
