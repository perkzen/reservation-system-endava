import React, { FC, useEffect, useState } from 'react';
import classes from './ProfilePage.module.scss';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../../../store/app/hooks';
import { useForm } from 'react-hook-form';
import Input from '../../ui/Input/Input';
import Button from '../../ui/Button/Button';
import {
  fetchUserDetails,
  saveUserDetails,
} from '../../../store/actions/userActions';
import { requiredField } from '../../../constants/requiredField';

interface UserDetailsFormData {
  firstname: string;
  surname: string;
  location: string;
}

const defaultValues: UserDetailsFormData = {
  firstname: '',
  surname: '',
  location: '',
};

const ProfilePage: FC = () => {
  const { t } = useTranslation();
  const { details, user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const [method, setMethod] = useState<'POST' | 'PUT'>('POST');

  const { register, reset, formState, handleSubmit } =
    useForm<UserDetailsFormData>({
      defaultValues,
      reValidateMode: 'onSubmit',
    });

  const { errors } = formState;

  useEffect(() => {
    if (user) dispatch(fetchUserDetails(user.uid));
  }, [dispatch, user]);

  useEffect(() => {
    if (details?.uid) {
      setMethod('PUT');
      reset({
        firstname: details.firstname,
        surname: details.surname,
        location: details.location,
      });
    }
  }, [details, reset]);

  const onSubmit = (data: UserDetailsFormData) => {
    dispatch(saveUserDetails({ ...data, uid: user?.uid, method }));
  };

  return (
    <div className={classes.Container}>
      <h1>{t('profile_page')}</h1>
      <img
        src={'https://avatars.dicebear.com/api/initials/domen.svg'}
        className={'rounded-full'}
        width={100}
        height={100}
        alt={'Profile'}
      />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          {...register('firstname', requiredField)}
          placeholder={t('firstname')}
          error={errors.firstname}
          className={classes.Input}
        />
        <Input
          {...register('surname', requiredField)}
          placeholder={t('surname')}
          error={errors.surname}
          className={classes.Input}
        />
        <Input
          {...register('location', requiredField)}
          placeholder={t('location')}
          error={errors.location}
          className={classes.Input}
        />
        <Button>{t('save')}</Button>
      </form>
    </div>
  );
};

export default ProfilePage;