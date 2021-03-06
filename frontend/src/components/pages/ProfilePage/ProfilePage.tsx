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
import ComboBox from '../../ui/ComboBox/Combobox';
import LoadingSpinner from '../../ui/LoadingSpinner/LoadingSpinner';
import { UserIcon } from '@heroicons/react/solid';
import { initialRedirectToOffice } from '../../../store/features/globalSlice';
import Toggle from '../../ui/Toggle/Toggle';

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
  const [primaryOffice, setPrimaryOffice] = useState<string | undefined>(
    details?.primaryOffice.name
  );
  const primaryOfficeData = offices.find(
    (office) => office.name === primaryOffice
  );
  const [redirectOnLogin, setRedirectOnLogin] = useState<boolean>(false);

  const { register, reset, formState, handleSubmit } =
    useForm<UserDetailsFormData>({
      defaultValues,
      reValidateMode: 'onSubmit',
    });

  const { errors } = formState;

  useEffect(() => {
    dispatch(fetchOffices());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchUserDetails());
    dispatch(initialRedirectToOffice());
  }, [dispatch]);

  useEffect(() => {
    setPrimaryOffice(details?.primaryOffice.name);
  }, [details]);

  useEffect(() => {
    if (details?.uid) {
      setMethod('PUT');
      reset({
        firstname: details.firstname,
        surname: details.surname,
      });
      setRedirectOnLogin(details.redirectOnLogin);
    }
  }, [details, primaryOffice, reset]);

  const onSubmit = (data: UserDetailsFormData) => {
    dispatch(
      saveUserDetails({
        ...data,
        uid: user?.uid,
        method,
        primaryOffice: {
          name: primaryOffice,
          _id: primaryOfficeData?._id,
          location: primaryOfficeData?.location,
        },
        redirectOnLogin: redirectOnLogin,
      })
    );
  };

  const isDisabled = () => {
    return primaryOffice === undefined;
  };

  const toggleRedirectOnLogin = () => {
    setRedirectOnLogin(!redirectOnLogin);
  };

  return (
    <div className={classes.Container}>
      {!user ? (
        <LoadingSpinner />
      ) : (
        <>
          {details ? (
            <img
              src={`https://avatars.dicebear.com/api/initials/${details?.firstname}_${details?.surname}.svg`}
              className={'rounded-full'}
              width={100}
              height={100}
              alt={'Profile'}
            />
          ) : (
            <UserIcon className={'text-neutral-700'} width={50} height={50} />
          )}
        </>
      )}

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
          <ComboBox
            selected={primaryOffice}
            setSelected={setPrimaryOffice}
            options={options}
            label={'Primary office'}
            query={query}
            setQuery={setQuery}
          />
        </div>
        <div>
          <Toggle
            checked={redirectOnLogin}
            label={t('redirect_on_login')}
            handleChangeToggle={toggleRedirectOnLogin}
          />
        </div>
        <Button disabled={isDisabled()}>{t('save')}</Button>
      </form>
    </div>
  );
};

export default ProfilePage;
