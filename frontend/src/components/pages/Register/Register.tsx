import React, { FC, useEffect, useState } from 'react';
import classes from './Register.module.scss';
import { useForm } from 'react-hook-form';
import companyLogo from '../../../assets/endava-logo.png';
import Input from '../../ui/Input/Input';
import Button from '../../ui/Button/Button';
import { useTranslation } from 'react-i18next';
import ErrorMessage from '../../ui/ErrorMessage/ErrorMessage';
import { Errors } from '../../../constants/errorConstants';
import { requiredField } from '../../../constants/requiredField';

interface RegisterFormData {
  email: string;
  password: string;
  confirmPassword: string;
}

const defaultValues: RegisterFormData = {
  email: '',
  password: '',
  confirmPassword: '',
};

const Register: FC = () => {
  const [error, setError] = useState<Errors>();
  const { t } = useTranslation();
  const { register, formState, handleSubmit } = useForm<RegisterFormData>({
    defaultValues,
    mode: 'onSubmit',
  });

  const { errors } = formState;

  useEffect(() => {
    return () => {
      setError(undefined);
    };
  });

  const onSubmit = (data: RegisterFormData) => {
    if (data.password !== data.confirmPassword) {
      setError(Errors.PASSWORDS_DONT_MATCH);
      return;
    }

    setError(undefined);
    console.log(data);
  };

  return (
    <div className={classes.Container}>
      <div className={classes.Header}>
        <img src={companyLogo} alt="Company logo" />
        <h2>{t('create_account')}</h2>
        <p>{t('seat_reservation_system')}</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={classes.ErrorContainer}>
          <ErrorMessage error={error} />
        </div>
        <Input
          {...register('email', requiredField)}
          placeholder={t('email')}
          className={'mt-1'}
          error={errors.email}
        />
        <Input
          {...register('password', requiredField)}
          placeholder={t('password')}
          type={'password'}
          className={'mt-1'}
          error={errors.password}
        />
        <Input
          {...register('confirmPassword', requiredField)}
          placeholder={t('confirm_password')}
          type={'password'}
          className={'mt-1'}
          error={errors.confirmPassword}
        />
        <Button>{t('sign_up')}</Button>
      </form>
    </div>
  );
};

export default Register;
