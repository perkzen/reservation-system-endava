import React, { FC } from 'react';
import { CheckIcon, ExclamationIcon, XIcon } from '@heroicons/react/outline';
import { Modal } from '../../../store/models/Modal';
import classes from './Modal.module.scss';
import Button from '../Button/Button';

interface ModalSuccessProps {
  modalData: Modal;
}

const ModalSuccess: FC<ModalSuccessProps> = ({ modalData }) => {
  return (
    <div className={classes.Modal} onClick={(event) => event.stopPropagation()}>
      <div className={classes.Content}>
        <div>
          {
            {
              SUCCESS: (
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                  <CheckIcon
                    className="h-6 w-6 text-green-600"
                    aria-hidden="true"
                  />
                </div>
              ),
              DELETE: (
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
                  <XIcon className="h-6 w-6 text-red-500" aria-hidden="true" />
                </div>
              ),
              ERROR: (
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-yellow-100">
                  <ExclamationIcon
                    className="h-6 w-6 text-yellow-500"
                    aria-hidden="true"
                  />
                </div>
              ),
            }[modalData.type]
          }
        </div>
        <div className={classes.Title}>{modalData.title}</div>
        <div className={classes.SubTitle}>{modalData.subtitle}</div>
        <div className={classes.Body}>{modalData.body}</div>

        <div className={classes.ButtonContainer}>
          {modalData.primaryAction ? (
            <Button onClick={modalData.primaryAction}>
              {modalData.action1}
            </Button>
          ) : null}
          {modalData.secondaryAction ? (
            <Button onClick={modalData.secondaryAction}>
              {modalData.action2}
            </Button>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default ModalSuccess;
