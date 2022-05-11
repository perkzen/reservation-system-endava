import React, { FC } from 'react';
import classes from './Register.module.scss';
import { useForm } from 'react-hook-form';
import companyLogo from '../../../assets/endava-logo.png';
import Input from '../../ui/Input/Input';
import Button from '../../ui/Button/Button';

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
        <h2>Create your account</h2>
        <p>Seat reservation system</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          {...register('firstname')}
          placeholder={'Firstname'}
          className={'mt-1'}
          errors={errors.firstname}
        />
        <Input
          {...register('surname')}
          placeholder={'Surname'}
          className={'mt-1'}
          errors={errors.surname}
        />
        <Input
          {...register('email')}
          placeholder={'Email'}
          className={'mt-1'}
          errors={errors.email}
        />
        <Input
          {...register('password')}
          placeholder={'Password'}
          className={'mt-1'}
          errors={errors.password}
        />
        <Input
          {...register('confirmPassword')}
          placeholder={'Confirm password'}
          className={'mt-1'}
          errors={errors.confirmPassword}
        />
        <Button>Sign up</Button>
      </form>
    </div>
  );
};

export default Register;
