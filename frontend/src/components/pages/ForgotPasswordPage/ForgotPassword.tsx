import React, { FC, useState } from 'react';
import classes from './ForgotPassword.module.scss';
import companyLogo from '../../../assets/endava-logo.png';
import Button from '../../ui/Button/Button';
import { Link } from 'react-router-dom';
import Input from '../../ui/Input/Input';
import { useForm } from 'react-hook-form';
import { routes } from '../../../routes';
import { useTranslation } from 'react-i18next';
import ErrorMessage from '../../ui/ErrorMessage/ErrorMessage';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../../firebase-config';
import firebase from 'firebase/compat';
import { Errors, FirebaseErrors } from '../../../constants/errorConstants';
import { requiredField } from '../../../constants/requiredField';
import { toast } from 'react-toastify';

interface ResetFormData {
  email: string;
}

const defaultValues: ResetFormData = {
  email: '',
};

const ForgotPassword: FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { t } = useTranslation();
  const { register, formState, handleSubmit } = useForm<ResetFormData>({
    defaultValues,
    mode: 'onSubmit',
  });

  const { errors } = formState;

  const onSubmit = async (data: ResetFormData) => {
    setLoading(true);
    setError('');

    try {
      await forgotPassword(data.email);
      toast.success(t('email_sent'));
    } catch (e) {
      const error = e as firebase.auth.Error;

      if (error.message === FirebaseErrors.INVALID_MAIL) {
        setError(Errors.INVALID_EMAIL);
        return;
      }

      setError(Errors.UNKNOWN_ERROR);
    } finally {
      setLoading(false);
    }
  };

  const forgotPassword = (email: string) => {
    return sendPasswordResetEmail(auth, email, {
      url: 'http://localhost:3000/sign-in',
    });
  };

  return (
    <div className={classes.Container}>
      <div className={classes.Header}>
        <img src={companyLogo} alt="Company logo" />
        <h2>{t('forgotten_password')}</h2>
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
        <div className={classes.Actions}>
          <div>
            <Link to={routes.LOGIN}>{t('back_to_login')}</Link>
          </div>
        </div>
        <Button loading={loading}>{t('send')}</Button>
      </form>
    </div>
  );
};

export default ForgotPassword;
