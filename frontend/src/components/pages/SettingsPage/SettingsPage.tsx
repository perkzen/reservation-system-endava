import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/app/hooks';
import {
  fetchSettings,
  saveSettings,
} from '../../../store/actions/settingsActions';
import Input from '../../ui/Input/Input';
import classes from './SettingsPage.module.scss';
import Button from '../../ui/Button/Button';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import Toggle from '../../ui/Toggle/Toggle';
import { Errors } from '../../../constants/errorConstants';
import ErrorMessage from '../../ui/ErrorMessage/ErrorMessage';

interface SettingsFormData {
  activeReservations: number;
  numOfDaysDisplayed: number;
  numOfExpiredReservations: number;
}

const defaultValues: SettingsFormData = {
  activeReservations: 0,
  numOfDaysDisplayed: 0,
  numOfExpiredReservations: 0,
};

const SettingsPage = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const [showWeekends, setShowWeekends] = useState<boolean>(true);
  const [error, setError] = useState('');

  const { settings } = useAppSelector((state) => state.settings);

  const { register, formState, reset, handleSubmit } =
    useForm<SettingsFormData>({
      defaultValues,
      reValidateMode: 'onSubmit',
    });
  const { errors } = formState;

  const toggleShowWeekends = () => {
    setShowWeekends(!showWeekends);
  };

  useEffect(() => {
    dispatch(fetchSettings());
  }, [dispatch]);

  useEffect(() => {
    if (settings) {
      reset({
        activeReservations: settings.activeReservations,
        numOfDaysDisplayed: settings.numOfDaysDisplayed,
        numOfExpiredReservations: settings.numOfExpiredReservations,
      });
      setShowWeekends(settings.showWeekends);
    }
  }, [settings, reset]);

  const onSubmit = (data: SettingsFormData) => {
    setError('');

    if (
      data.activeReservations < 0 ||
      data.numOfDaysDisplayed < 0 ||
      data.numOfExpiredReservations < 0
    ) {
      setError(Errors.INVALID_NUMBER);
      return;
    }

    dispatch(
      saveSettings({
        ...data,
        activeReservations: data.activeReservations,
        numOfDaysDisplayed: data.numOfDaysDisplayed,
        numOfExpiredReservations: data.numOfExpiredReservations,
        showWeekends: showWeekends,
      })
    );
  };

  return (
    <div className={classes.Container}>
      <h1 className={classes.Title}>Application settings</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={classes.ErrorContainer}>
          <ErrorMessage error={error} />
        </div>
        <div>
          <Toggle
            checked={showWeekends}
            label={t('show_weekends')}
            handleChangeToggle={toggleShowWeekends}
          />
        </div>
        <div>
          <Input
            type="number"
            {...register('activeReservations', { required: true })}
            error={errors.activeReservations}
            label={t('active_reservations')}
          />
        </div>
        <div>
          <Input
            type="number"
            {...register('numOfDaysDisplayed', { required: true })}
            error={errors.numOfDaysDisplayed}
            label={t('num_of_days_displayed')}
          />
        </div>
        <div>
          <Input
            type="number"
            {...register('numOfExpiredReservations', { required: true })}
            error={errors.numOfExpiredReservations}
            label={t('num_of_expired_reservations')}
          />
        </div>
        <Button>{t('save')}</Button>
      </form>
    </div>
  );
};

export default SettingsPage;
