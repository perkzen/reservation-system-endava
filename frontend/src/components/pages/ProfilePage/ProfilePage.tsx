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
import ComboBox from '../../ui/Combobox/Combobox';
import { fetchOffices } from '../../../store/actions/officeActions';

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
  const { offices } = useAppSelector((state) => state.office);
  const dispatch = useAppDispatch();
  const [method, setMethod] = useState<'POST' | 'PUT'>('POST');
  const [location, setLocation] = useState<any>(details?.location);

  const { register, reset, formState, handleSubmit } =
    useForm<UserDetailsFormData>({
      defaultValues,
      reValidateMode: 'onSubmit',
    });

  const { errors, isDirty } = formState;

  useEffect(() => {
    if (offices) dispatch(fetchOffices());
  }, [dispatch, offices]);

  useEffect(() => {
    if (user) dispatch(fetchUserDetails());
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
      <img
        src={`https://avatars.dicebear.com/api/initials/${details?.firstname}_${details?.surname}.svg`}
        className={'rounded-full'}
        width={100}
        height={100}
        alt={'Profile'}
      />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={classes.InputContainer}>
          <Input
            {...register('firstname', requiredField)}
            error={errors.firstname}
            className={classes.Input}
            name="firstname"
            label={t('firstname')}
          />
        </div>
        <div>
          <Input
            {...register('surname', requiredField)}
            error={errors.surname}
            className={classes.Input}
            name="surname"
            label={t('surname')}
          />
        </div>
        <div>
          <label className={classes.CustomLabel}>{t('location')}</label>
          {offices.length > 0 && (
            <ComboBox
              data={offices}
              queryAccessor={'name'}
              onStateChange={setLocation}
            />
          )}
        </div>
        <div className={classes.Button}>
          <Button disabled={!isDirty}>{t('save')}</Button>
        </div>
      </form>
    </div>
  );
};

export default ProfilePage;
