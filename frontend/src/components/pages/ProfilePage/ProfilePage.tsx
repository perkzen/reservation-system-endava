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
import { classNames } from '../../../utils/classNames';

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
  const [method, setMethod] = useState<'POST' | 'PATCH'>('POST');
  //if you want to disable user data editing
  const [disabled, setDisabled] = useState<boolean>(false);

  const { register, reset, formState, handleSubmit } =
    useForm<UserDetailsFormData>({
      defaultValues,
      reValidateMode: 'onSubmit',
    });

  const { errors } = formState;

  useEffect(() => {
    if (user) dispatch(fetchUserDetails());
  }, [dispatch, user]);

  useEffect(() => {
    if (details?.uid) {
      setMethod('PATCH');
      reset({
        firstname: details.firstname,
        surname: details.surname,
        location: details.location,
      });
    }
  }, [details, reset]);

  useEffect(() => {
    if (details) {
      setDisabled(true);
    }
  });

  const onSubmit = (data: UserDetailsFormData) => {
    dispatch(saveUserDetails({ ...data, uid: user?.uid, method }));
  };

  return (
    <div className={classes.Container}>
      <img
        src={'https://avatars.dicebear.com/api/initials/domen.svg'}
        className={'rounded-full'}
        width={100}
        height={100}
        alt={'Profile'}
      />

      <form onSubmit={handleSubmit(onSubmit)}>
        {details?.firstname ? (
          <label htmlFor="firstname">{t('firstname')}</label>
        ) : null}
        <Input
          {...register('firstname', requiredField)}
          error={errors.firstname}
          className={classes.Input}
          name="firstname"
        />
        <label htmlFor="surname">{t('surname')}</label>
        <Input
          {...register('surname', requiredField)}
          error={errors.surname}
          className={classes.Input}
          name="surname"
        />
        <label htmlFor="location">{t('location')}</label>
        <Input
          {...register('location', requiredField)}
          error={errors.location}
          className={classes.Input}
          name="location"
        />
        <Button disabled={false} className={classNames(classes.Container)}>
          {t('save')}
        </Button>
      </form>
    </div>
  );
};

export default ProfilePage;
