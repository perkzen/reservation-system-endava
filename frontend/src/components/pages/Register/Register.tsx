import React, { FC } from 'react';
import classes from './Register.module.scss';
import { useForm } from 'react-hook-form';
import companyLogo from '../../../assets/endava-logo.png';
import Input from '../../ui/Input/Input';
import Button from '../../ui/Button/Button';
import { useTranslation } from 'react-i18next';

interface RegisterFormData {
  firstname: string;
  surname: string;
  email: string;
  password: string;
  confirmPassword: string;
  office: string;
}

const defaultValues: RegisterFormData = {
  firstname: '',
  surname: '',
  email: '',
  password: '',
  confirmPassword: '',
  office: '',
};

const Register: FC = () => {
  const { t } = useTranslation();
  const { register, formState, handleSubmit } = useForm<RegisterFormData>({
    defaultValues,
    mode: 'onSubmit',
  });

  const { errors } = formState;

  const onSubmit = (data: RegisterFormData) => {
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
        <Input
          {...register('firstname')}
          placeholder={t('firstname')}
          className={'mt-1'}
          errors={errors.firstname}
        />
        <Input
          {...register('surname')}
          placeholder={t('surname')}
          className={'mt-1'}
          errors={errors.surname}
        />
        <Input
          {...register('email')}
          placeholder={t('email')}
          className={'mt-1'}
          errors={errors.email}
        />
        <Input
          {...register('password')}
          placeholder={t('password')}
          type={'password'}
          className={'mt-1'}
          errors={errors.password}
        />
        <Input
          {...register('confirmPassword')}
          placeholder={t('confirm_password')}
          type={'password'}
          className={'mt-1'}
          errors={errors.confirmPassword}
        />
        <Button>{t('sign_up')}</Button>
      </form>
    </div>
  );
};

export default Register;
