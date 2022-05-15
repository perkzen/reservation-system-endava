import React, { FC } from 'react';
import { CheckIcon, ExclamationIcon, XIcon } from '@heroicons/react/outline';
import { Modal as ModalModel, ModalType } from '../../../store/models/Modal';
import classes from './Modal.module.scss';
import Button from '../Button/Button';

interface ModalSuccessProps {
  modal: ModalModel;
}

const Modal: FC<ModalSuccessProps> = ({ modal }) => {
  return (
    <div className={classes.Modal} onClick={(event) => event.stopPropagation()}>
      <div className={classes.Content}>
        <div>
          {
            {
              [ModalType.SUCCESS]: (
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                  <CheckIcon
                    className="h-6 w-6 text-green-600"
                    aria-hidden="true"
                  />
                </div>
              ),
              [ModalType.DELETE]: (
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
                  <XIcon className="h-6 w-6 text-red-500" aria-hidden="true" />
                </div>
              ),
              [ModalType.WARNING]: (
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-yellow-100">
                  <ExclamationIcon
                    className="h-6 w-6 text-yellow-500"
                    aria-hidden="true"
                  />
                </div>
              ),
            }[modal.type]
          }
        </div>
        <div className={classes.Title}>{modal.title}</div>
        <div className={classes.Body}>{modal.body}</div>
        <div className={classes.ButtonContainer}>
          {modal.primaryAction ? (
            <Button onClick={modal.primaryAction}>
              {modal.primaryActionText}
            </Button>
          ) : null}
          {modal.secondaryAction ? (
            <Button onClick={modal.secondaryAction}>
              {modal.secondaryButtonText}
            </Button>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Modal;
