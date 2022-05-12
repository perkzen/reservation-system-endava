import React, { FC } from 'react';
import { routes } from '../../../../routes';
import { Link } from 'react-router-dom';
import companyLogo from '../../../../assets/endava-logo.png';

interface LogoProps {
  className?: string;
}

const Logo: FC<LogoProps> = ({ className }) => {
  return (
    <Link to={routes.HOME} className={className}>
      <img src={companyLogo} alt="Company Logo" />
    </Link>
  );
};

export default Logo;
