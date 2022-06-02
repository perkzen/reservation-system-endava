import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/app/hooks';
import {
  fetchSettings,
  saveSettings,
} from '../../../store/actions/settingsActions';
import Input from '../../ui/Input/Input';
import { requiredField } from '../../../constants/requiredField';
import classes from './SettingsPage.module.scss';
import Button from '../../ui/Button/Button';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import Toggle from '../../ui/Toggle/Toggle';

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
    console.log(data);
    dispatch(
      saveSettings({
        ...data,
        activeReservations: parseInt(String(data.activeReservations)),
        numOfDaysDisplayed: parseInt(String(data.numOfDaysDisplayed)),
        numOfExpiredReservations: parseInt(
          String(data.numOfExpiredReservations)
        ),
        showWeekends: showWeekends,
      })
    );
  };

  return (
    <div className={classes.Container}>
      <h1 className={classes.Title}>Application settings</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Toggle
            checked={showWeekends}
            label={t('show_weekends')}
            handleChangeToggle={toggleShowWeekends}
          />
        </div>
        <div>
          <Input
            {...register('activeReservations', requiredField)}
            error={errors.activeReservations}
            label={t('active_reservations')}
          />
        </div>
        <div>
          <Input
            {...register('numOfDaysDisplayed', requiredField)}
            error={errors.numOfDaysDisplayed}
            label={t('num_of_days_displayed')}
          />
        </div>
        <div>
          <Input
            {...register('numOfExpiredReservations', requiredField)}
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
