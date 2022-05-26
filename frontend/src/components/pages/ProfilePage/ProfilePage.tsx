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
import { fetchOffices } from '../../../store/actions/officeActions';
import Combobox from '../../ui/Combobox/Combobox';

interface UserDetailsFormData {
  firstname: string;
  surname: string;
}

const defaultValues: UserDetailsFormData = {
  firstname: '',
  surname: '',
};

const ProfilePage: FC = () => {
  const { t } = useTranslation();
  const { details, user } = useAppSelector((state) => state.user);
  const { offices } = useAppSelector((state) => state.office);
  const dispatch = useAppDispatch();
  const [method, setMethod] = useState<'POST' | 'PUT'>('POST');
  const options = offices.map((office) => office.name);
  const [query, setQuery] = useState('');
  const [office, setOffice] = useState(details?.location);

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
    if (user) {
      dispatch(fetchUserDetails());
    }
  }, [dispatch, user]);

  useEffect(() => {
    setOffice(details?.location);
  }, [details]);

  useEffect(() => {
    if (details?.uid) {
      setMethod('PUT');
      reset({
        firstname: details.firstname,
        surname: details.surname,
      });
    }
  }, [details, office, reset]);

  const onSubmit = (data: UserDetailsFormData) => {
    dispatch(
      saveUserDetails({
        ...data,
        uid: user?.uid,
        method,
        location: office as string,
      })
    );
  };

  const isDisabled = isDirty || details?.location === office;

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
        <div>
          <Input
            {...register('firstname', requiredField)}
            error={errors.firstname}
            label={t('firstname')}
          />
        </div>
        <div>
          <Input
            {...register('surname', requiredField)}
            error={errors.surname}
            label={t('surname')}
          />
        </div>
        <div>
          <Combobox
            selected={office}
            setSelected={setOffice}
            options={options}
            label={'Primary office'}
            query={query}
            setQuery={setQuery}
          />
        </div>
        <Button disabled={isDisabled}>{t('save')}</Button>
      </form>
    </div>
  );
};

export default ProfilePage;
