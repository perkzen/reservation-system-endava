import React, { FC } from 'react';
import { routes } from '../../../../routes';
import { Link } from 'react-router-dom';
import companyLogoSecondary from '../../../../assets/endava-logo-secondary.png';
import { useTranslation } from 'react-i18next';

interface LogoProps {
  className?: string;
}

const Logo: FC<LogoProps> = ({ className }) => {
  const { t } = useTranslation();

  return (
    <Link to={routes.HOME} className={className}>
      <img
        src={companyLogoSecondary}
        alt={t('companyLogo')}
        className="w-8/12 h-auto mx-auto md:w-full"
      />
    </Link>
  );
};

export default Logo;
