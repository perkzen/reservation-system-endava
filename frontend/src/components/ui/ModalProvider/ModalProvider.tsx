import React, { FC, Fragment, ReactNode } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/app/hooks';
import { createPortal } from 'react-dom';
import classes from './ModalProvider.module.scss';
import { classNames } from '../../../utils/classNames';
import { removeModal } from '../../../store/features/globalSlice';
import DeleteModal from '../DeleteModal/DeleteModal';
import { ModalType } from '../../../store/models/Modal';
import ReservationModal from '../ReservationModal/ReservationModal';
import { Transition } from '@headlessui/react';

interface ModalProviderProps {
  children: ReactNode;
}

const ModalProvider: FC<ModalProviderProps> = ({ children }) => {
  const dispatch = useAppDispatch();
  const { modal } = useAppSelector((state) => state.global);
  const open = !!modal;

  const showModal = () => {
    switch (modal?.type) {
      case ModalType.DELETE:
        return <DeleteModal modal={modal} />;
      case ModalType.RESERVATION:
        return <ReservationModal modal={modal} />;
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
            <>
              <Transition appear show={open} as="div">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <div className={classes.Container}>{showModal()}</div>
                </Transition.Child>
              </Transition>
            </>
          </div>,
          document.body
        )}
    </>
  );
};

export default ModalProvider;
