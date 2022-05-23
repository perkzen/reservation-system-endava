import React, { FC } from 'react';
import classes from './ReservationModal.module.scss';
import { Modal } from '../../../store/models/Modal';
import { CalendarIcon } from '@heroicons/react/outline';
import Input from '../Input/Input';
import Button from '../Button/Button';
import { format } from 'date-fns';
import { ReservationModalData } from '../../../store/models/Reservation';
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../../store/app/hooks';
import { createReservation } from '../../../store/actions/reservationActions';
import { removeModal } from '../../../store/features/globalSlice';

interface ReservationModalProps {
  modal: Modal;
}

interface ReservationFormData {
  comment: string;
}

const defaultValues: ReservationFormData = {
  comment: '',
};

const ReservationModal: FC<ReservationModalProps> = ({
  modal: { title, data },
}) => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);
  const reservationData = data as ReservationModalData;
  const reservation = {
    ...reservationData,
    from: dateToUTC(reservationData.date, reservationData.from),
    to: dateToUTC(reservationData.date, reservationData.to),
  };

  const { register, handleSubmit } = useForm<ReservationFormData>({
    defaultValues,
    reValidateMode: 'onSubmit',
  });

  const onSubmit = (formData: ReservationFormData) => {
    if (user) {
      dispatch(
        createReservation({
          ...reservation,
          userId: user?.uid,
          comment: formData.comment,
        })
      );
      dispatch(removeModal());
    }
  };

  return (
    <div
      className={classes.Container}
      onClick={(event) => event.stopPropagation()}
    >
      <div className={classes.Content}>
        <div className={classes.Icon}>
          <CalendarIcon />
        </div>
        <div className={classes.Header}>
          <div className={classes.Title}>{title}</div>
        </div>

        <div className={classes.Body}>
          <p>
            Selected day: <b>{format(reservationData.date, 'dd.MM.yyyy')}</b>
          </p>
          <p>
            Selected time:{' '}
            <b>{reservationData.from + 'h - ' + reservationData.to + 'h'}</b>
          </p>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Input {...register('comment')} label={'Comment'} />
            <Button>Confirm</Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReservationModal;
