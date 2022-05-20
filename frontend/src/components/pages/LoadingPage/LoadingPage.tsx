import React from 'react';
import classes from './LoadingPage.module.scss';
import loading from '../../../assets/loading.gif';

const LoadingPage = () => {
  return (
    <div className={classes.Container}>
      <img src={loading} alt="Loading spinner" />
    </div>
  );
};

export default LoadingPage;
