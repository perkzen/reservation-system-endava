import classes from '../components/ui/Workspace/Workspace.module.scss';

export enum DeskOrientation {
  LEFT = 'left',
  RIGHT = 'right',
  TOP = 'top',
  BOTTOM = 'bottom',
}

export const deskOrientation = (orientation: DeskOrientation): string => {
  switch (orientation) {
    case DeskOrientation.TOP:
      return classes.Top;
    case DeskOrientation.BOTTOM:
      return classes.Bottom;
    case DeskOrientation.LEFT:
      return classes.Left;
    case DeskOrientation.RIGHT:
      return '';
  }
};
