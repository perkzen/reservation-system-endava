export enum ModalType {
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
  DELETE = 'DELETE',
}

export interface Modal {
  type: ModalType;
  onClick: () => void;
  onBackdropClose?: () => void;
}
