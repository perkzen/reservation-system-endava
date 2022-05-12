import React, { FC } from 'react';
import classes from './Login.module.scss';
import companyLogo from '../../../assets/endava-logo.png';
import Button from '../../ui/Button/Button';
import { Link } from 'react-router-dom';
import Input from '../../ui/Input/Input';
import { useForm } from 'react-hook-form';
import { routes } from '../../../routes';
import { useTranslation } from 'react-i18next';

interface LoginFormData {
  email: string;
  password: string;
}

const defaultValues: LoginFormData = {
  email: '',
  password: '',
};

const Login: FC = () => {
  const { t } = useTranslation();
  const { register, formState, handleSubmit } = useForm<LoginFormData>({
    defaultValues,
    mode: 'onSubmit',
  });

  const { errors } = formState;

  const onSubmit = (data: LoginFormData) => {
    console.log(data);
  };

  return (
    <div className={classes.Container}>
      <div className={classes.Header}>
        <img src={companyLogo} alt="Company logo" />
        <h2>{t('sign_in_your_account')}</h2>
        <p>{t('seat_reservation_system')}</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          {...register('email')}
          placeholder={t('email')}
          className={'mt-1'}
          error={errors.email}
        />
        <Input
          {...register('password')}
          placeholder={t('password')}
          type={'password'}
          className={'mt-1'}
          error={errors.password}
        />
        <div className={classes.Actions}>
          <div>
            <Link to={routes.REGISTER}>{t('create_account')}</Link>
          </div>
          <div>
            <Link to={''}>{t('forgot_password')}</Link>
          </div>
        </div>
        <Button>{t('sign_in')}</Button>
      </form>
    </div>
  );
};

export default Login;
