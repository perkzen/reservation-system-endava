import React, { FC, useState } from 'react';
import classes from './ResetPassword.module.scss';
import companyLogo from '../../../assets/endava-logo.png';
import Button from '../../ui/Button/Button';
import { Link, useLocation } from 'react-router-dom';
import Input from '../../ui/Input/Input';
import { useForm } from 'react-hook-form';
import { routes } from '../../../routes';
import { useTranslation } from 'react-i18next';
import ErrorMessage from '../../ui/ErrorMessage/ErrorMessage';
import { confirmPasswordReset } from 'firebase/auth';
import { auth } from '../../../firebase-config';
import firebase from 'firebase/compat';
import { Errors, FirebaseErrors } from '../../../constants/errorConstants';
import { requiredField } from '../../../constants/requiredField';
import { toast } from 'react-toastify';

interface ResetFormData {
  password: string;
}

const defaultValues: ResetFormData = {
  password: '',
};

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const ResetPassword: FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { t } = useTranslation();
  const { register, formState, handleSubmit } = useForm<ResetFormData>({
    defaultValues,
    mode: 'onSubmit',
  });
  const query = useQuery();

  const { errors } = formState;

  const onSubmit = async (data: ResetFormData) => {
    setLoading(true);
    setError('');

    try {
      await resetPassword(query.get('oobCode')!, data.password);
      toast.success(t('reset_success'));
    } catch (e) {
      const error = e as firebase.auth.Error;

      if (error.message === FirebaseErrors.INVALID_ACTION) {
        setError(Errors.INVALID_ACTION);
        return;
      }

      if (error.message === FirebaseErrors.SHORT_PASSWORD) {
        setError(Errors.SHORT_PASSWORD);
        return;
      }

      setError(Errors.UNKNOWN_ERROR);
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = (oobCode: string, newPassword: string) => {
    return confirmPasswordReset(auth, oobCode, newPassword);
  };

  return (
    <div className={classes.Container}>
      <div className={classes.Header}>
        <img src={companyLogo} alt="Company logo" />
        <h2>{t('reset_password')}</h2>
        <p>{t('seat_reservation_system')}</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={classes.ErrorContainer}>
          <ErrorMessage error={error} />
        </div>
        <Input
          {...register('password', requiredField)}
          label={t('new_password')}
          type={'password'}
          className={'mt-1'}
          error={errors.password}
        />
        <div className={classes.Actions}>
          <div>
            <Link to={routes.LOGIN}>{t('back_to_login')}</Link>
          </div>
        </div>
        <Button loading={loading}>{t('reset')}</Button>
      </form>
    </div>
  );
};

export default ResetPassword;
