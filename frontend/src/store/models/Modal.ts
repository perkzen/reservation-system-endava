import { ReactNode } from 'react';

export enum ModalType {
  DELETE = 'DELETE',
  RESERVATION = 'RESERVATION',
}

export interface Modal {
  type: ModalType;
  title: string;
  data?: unknown;
  primaryActionText?: string;
  secondaryButtonText?: string;
  body?: ReactNode;
  onBackdropClose?: () => void;
  primaryAction?: () => void;
  secondaryAction?: () => void;
}
