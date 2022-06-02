import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '../../../store/app/hooks';
import classes from './PageNotFound.module.scss';
import { Link } from 'react-router-dom';
import { routes } from '../../../routes';

interface PageNotFoundProps {
  heading: string;
  info: string;
}

const PageNotFound: FC<PageNotFoundProps> = ({ heading, info }) => {
  const { t } = useTranslation();
  const { user } = useAppSelector((state) => state.user);
  const isAuthenticated = !!user;

  return (
    <div className={classes.Container}>
      <div className={classes.Wrapper}>
        <main>
          <p className={classes.ErrorCode}>404</p>
          <div className={classes.TextContainer}>
            <div className={classes.Divider}>
              <h1>{heading}</h1>
              <p className={classes.InfoText}>{info}</p>
            </div>
            <div className={classes.LinkContainer}>
              <Link
                to={isAuthenticated ? routes.HOME : routes.LOGIN}
                className={classes.LinkPrimary}
              >
                {t('go_back_home')}
              </Link>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default PageNotFound;
