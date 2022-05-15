import React, { FC, ReactNode } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/app/hooks';
import { createPortal } from 'react-dom';
import classes from './ModalProvider.module.scss';
import { classNames } from '../../../utils/classNames';
import { removeModal } from '../../../store/features/globalSlice';
import Modal from '../Modals/Modal';

interface ModalProviderProps {
  children: ReactNode;
}

const ModalProvider: FC<ModalProviderProps> = ({ children }) => {
  const dispatch = useAppDispatch();
  const { modal } = useAppSelector((state) => state.global);
  const open = !!modal;

  const showModalType = () => {
    if (modal?.type) {
      return <Modal modalData={modal} />;
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
