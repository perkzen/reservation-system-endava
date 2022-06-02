import React, { FC, useState } from 'react';
import classes from './Login.module.scss';
import companyLogo from '../../../assets/endava-logo.png';
import Button from '../../ui/Button/Button';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../../ui/Input/Input';
import { useForm } from 'react-hook-form';
import { routes } from '../../../routes';
import { useTranslation } from 'react-i18next';
import ErrorMessage from '../../ui/ErrorMessage/ErrorMessage';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../firebase-config';
import { useAppDispatch } from '../../../store/app/hooks';
import { setAccessToken, setUser } from '../../../store/features/userSlice';
import firebase from 'firebase/compat';
import { FirebaseUser } from '../../../store/models/User';
import { Errors, FirebaseErrors } from '../../../constants/errorConstants';
import { requiredField } from '../../../constants/requiredField';

interface LoginFormData {
  email: string;
  password: string;
}

const defaultValues: LoginFormData = {
  email: '',
  password: '',
};

const Login: FC = () => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const { t } = useTranslation();
  const { register, formState, handleSubmit } = useForm<LoginFormData>({
    defaultValues,
    mode: 'onSubmit',
  });

  const { errors } = formState;

  const onSubmit = async (data: LoginFormData) => {
    setError('');
    try {
      setLoading(true);
      const res = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      const user = res.user as FirebaseUser;
      const accessToken = await res.user.getIdToken(true);
      dispatch(setUser(user));
      dispatch(setAccessToken(accessToken));
      navigate(routes.HOME);
    } catch (e) {
      const error = e as firebase.auth.Error;

      if (
        error.message === FirebaseErrors.WRONG_PASSWORD ||
        FirebaseErrors.USER_NOT_FOUND ||
        FirebaseErrors.WRONG_EMAIL
      ) {
        setError(Errors.WRONG_CREDENTIALS);
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
        <h2>{t('sign_in_your_account')}</h2>
        <p>{t('workspace_reservation_system')}</p>
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
        <div className={classes.Actions}>
          <div>
            <Link to={routes.REGISTER}>{t('create_account')}</Link>
          </div>
          <div>
            <Link to={routes.FORGOT_PASSWORD}>{t('forgot_password')}</Link>
          </div>
        </div>
        <Button loading={loading}>{t('sign_in')}</Button>
      </form>
    </div>
  );
};

export default Login;
