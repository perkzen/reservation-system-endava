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
  body?: string;
  onBackdropClose?: () => void;
  primaryAction?: () => void;
  secondaryAction?: () => void;
}
