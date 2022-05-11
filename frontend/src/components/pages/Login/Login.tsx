import React, { FC } from 'react';
import classes from './Login.module.scss';
import companyLogo from '../../../assets/endava-logo.png';
import Button from '../../ui/Button/Button';
import { Link } from 'react-router-dom';
import Input from '../../ui/Input/Input';
import { useForm } from 'react-hook-form';

interface LoginFormData {
  email: string;
  password: string;
}

const defaultValues: LoginFormData = {
  email: '',
  password: '',
};

const Login: FC = () => {
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
        <h2>Sign in to your account</h2>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          {...register('email')}
          placeholder={'Email'}
          className={'mt-1'}
          errors={errors.email}
        />
        <Input
          {...register('password')}
          placeholder={'Password'}
          type={'password'}
          className={'mt-1'}
          errors={errors.password}
        />
        <div className={classes.Actions}>
          <div>
            <Link to={''}>Create new account</Link>
          </div>
          <div>
            <Link to={''}>Forgot your password?</Link>
          </div>
        </div>
        <Button>Sign in</Button>
      </form>
    </div>
  );
};

export default Login;
