export enum ModalType {
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
  DELETE = 'DELETE',
}

export interface Modal {
  type: ModalType;
  title: string;
  action1: string;
  action2: string;
  subtitle?: string;
  body?: string;
  onBackdropClose?: () => void;
  primaryAction?: () => void;
  secondaryAction?: () => void;
}
