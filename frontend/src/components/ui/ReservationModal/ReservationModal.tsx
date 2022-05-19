import React, { FC } from 'react';
import classes from './ReservationModal.module.scss';
import { Modal } from '../../../store/models/Modal';
import { CalendarIcon } from '@heroicons/react/outline';
import Input from '../Input/Input';
import Button from '../Button/Button';

interface ReservationModalProps {
  modal: Modal;
}

const ReservationModal: FC<ReservationModalProps> = ({ modal: { title } }) => {
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
            Selected day: <b>18.5.2022</b>
          </p>
          <p>
            Selected time: <b>8 AM - 5 PM</b>
          </p>

          <form>
            <Input label={'Comment'} />
            <Button>Confirm</Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReservationModal;
