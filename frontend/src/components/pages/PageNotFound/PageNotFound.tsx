import React, { FC } from 'react';
import classes from './PageNotFound.module.scss';
import { Link } from 'react-router-dom';
import { routes } from '../../../routes';

const PageNotFound: FC = () => {
  return (
    <div className={classes.Container}>
      <div className={classes.Wrapper}>
        <main>
          <p className={classes.ErrorCode}>404</p>
          <div className={classes.TextContainer}>
            <div className={classes.Divider}>
              <h1>Page not found</h1>
              <p className={classes.InfoText}>
                Please check the URL in the address bar and try again.
              </p>
            </div>
            <div className={classes.LinkContainer}>
              <Link to={routes.HOME} className={classes.LinkPrimary}>
                Go back home
              </Link>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default PageNotFound;
