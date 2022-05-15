export enum ModalType {
  SUCCESS = 'SUCCESS',
  WARNING = 'WARNING',
  DELETE = 'DELETE',
}

export interface Modal {
  type: ModalType;
  title: string;
  primaryActionText: string;
  secondaryButtonText: string;
  body?: string;
  onBackdropClose?: () => void;
  primaryAction?: () => void;
  secondaryAction?: () => void;
}
