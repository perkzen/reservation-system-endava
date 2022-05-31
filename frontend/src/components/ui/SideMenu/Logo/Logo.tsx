import React, { FC } from 'react';
import { routes } from '../../../../routes';
import { Link } from 'react-router-dom';
import companyLogoSecondary from '../../../../assets/endava-logo-secondary.png';

interface LogoProps {
  className?: string;
}

const Logo: FC<LogoProps> = ({ className }) => {
  return (
    <Link to={routes.HOME} className={className}>
      <img
        src={companyLogoSecondary}
        alt="Company Logo"
        className="w-8/12 h-auto mx-auto md:w-full"
      />
    </Link>
  );
};

export default Logo;
