import React, { FC } from 'react';
import { XIcon } from '@heroicons/react/outline';
import { Modal } from '../../../store/models/Modal';
import classes from './DeleteModal.module.scss';
import Button from '../Button/Button';
import { useAppDispatch } from '../../../store/app/hooks';
import { removeModal } from '../../../store/features/globalSlice';

interface DeleteModalProps {
  modal: Modal;
}

const DeleteModal: FC<DeleteModalProps> = ({
  modal: {
    title,
    body,
    primaryAction,
    primaryActionText,
    secondaryButtonText,
    secondaryAction,
  },
}) => {
  const dispatch = useAppDispatch();

  const handlePrimaryAction = () => {
    if (primaryAction) {
      primaryAction();
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
          <XIcon />
        </div>
        <div className={classes.Title}>{title}</div>
        <div className={classes.Body}>{body}</div>
        <div className={classes.ButtonContainer}>
          {secondaryAction && (
            <Button onClick={secondaryAction}>{secondaryButtonText}</Button>
          )}
          {primaryAction && (
            <Button onClick={handlePrimaryAction}>{primaryActionText}</Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
