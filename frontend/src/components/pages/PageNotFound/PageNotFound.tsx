import React, { FC } from 'react';
import classes from './PageNotFound.module.scss';
import { Link } from 'react-router-dom';
import { routes } from '../../../routes';
import { useTranslation } from 'react-i18next';

const PageNotFound: FC = () => {
  const { t } = useTranslation();

  return (
    <div className={classes.Container}>
      <div className={classes.Wrapper}>
        <main>
          <p className={classes.ErrorCode}>404</p>
          <div className={classes.TextContainer}>
            <div className={classes.Divider}>
              <h1>{t('page_not_found')}</h1>
              <p className={classes.InfoText}>{t('please_check_url')}</p>
            </div>
            <div className={classes.LinkContainer}>
              <Link to={routes.HOME} className={classes.LinkPrimary}>
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
