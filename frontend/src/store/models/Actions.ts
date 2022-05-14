interface Action {
  id?: string;
  actionType: string;
}

export interface LoadingAction extends Action {
  loading: boolean;
}

export interface ErrorAction extends Action {
  error: string;
}
