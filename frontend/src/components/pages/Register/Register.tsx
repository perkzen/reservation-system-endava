import React, { FC, useState } from 'react';
import classes from './Register.module.scss';
import { useForm } from 'react-hook-form';
import companyLogo from '../../../assets/endava-logo.png';
import Input from '../../ui/Input/Input';
import Button from '../../ui/Button/Button';
import { useTranslation } from 'react-i18next';
import ErrorMessage from '../../ui/ErrorMessage/ErrorMessage';
import { Errors, FirebaseErrors } from '../../../constants/errorConstants';
import { requiredField } from '../../../constants/requiredField';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../firebase-config';
import firebase from 'firebase/compat';

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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { t } = useTranslation();
  const { register, formState, handleSubmit } = useForm<RegisterFormData>({
    defaultValues,
    mode: 'onSubmit',
  });

  const { errors } = formState;

  const onSubmit = async (data: RegisterFormData) => {
    setLoading(true);
    setError('');
    if (data.password !== data.confirmPassword) {
      setError(Errors.PASSWORDS_DONT_MATCH);
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, data.email, data.password);
    } catch (e) {
      const error = e as firebase.auth.Error;

      if (error.message === FirebaseErrors.SHORT_PASSWORD) {
        setError(Errors.SHORT_PASSWORD);
        return;
      }
      if (error.message === FirebaseErrors.EMAIL_TAKE) {
        setError(Errors.EMAIL_TAKE);
        return;
      }

      if (error.message === FirebaseErrors.INVALID_MAIL) {
        setError(Errors.INVALID_EMAIL);
        return;
      }

      setError(Errors.UNKNOWN_ERROR);
    } finally {
      setLoading(false);
    }
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
          label={t('email')}
          className={'mt-1'}
          error={errors.email}
        />
        <Input
          {...register('password', requiredField)}
          label={t('password')}
          type={'password'}
          className={'mt-1'}
          error={errors.password}
        />
        <Input
          {...register('confirmPassword', requiredField)}
          label={t('confirm_password')}
          type={'password'}
          className={'mt-1'}
          error={errors.confirmPassword}
        />
        <Button loading={loading}>{t('sign_up')}</Button>
      </form>
    </div>
  );
};

export default Register;
