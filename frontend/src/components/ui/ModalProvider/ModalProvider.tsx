import React, { FC, ReactNode } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/app/hooks';
import { ModalType } from '../../../store/models/Modal';
import { createPortal } from 'react-dom';
import classes from './ModalProvider.module.scss';
import { classNames } from '../../../utils/classNames';
import { removeModal } from '../../../store/features/globalSlice';

interface ModalProviderProps {
  children: ReactNode;
}

const ModalProvider: FC<ModalProviderProps> = ({ children }) => {
  const dispatch = useAppDispatch();
  const { modal } = useAppSelector((state) => state.global);
  const open = !!modal;

  const showModalType = () => {
    switch (modal?.type) {
      case ModalType.SUCCESS:
        return <div>success modal</div>;
      case ModalType.DELETE:
        return <div>delete modal</div>;
    }
  };

  return (
    <>
      {children}
      {open &&
        createPortal(
          <div
            className={classNames(
              classes.Backdrop,
              open && classes.BackdropAnimateIn
            )}
            onClick={
              modal?.onBackdropClose ?? true
                ? () => dispatch(removeModal())
                : undefined
            }
          >
            <div className={classes.Container}>{showModalType()}</div>
          </div>,
          document.body
        )}
    </>
  );
};

export default ModalProvider;
