import React, { FC } from 'react';
import classes from './Toggle.module.scss';

interface ToggleProps {
  handleChangeToggle: () => void;
  checked: boolean;
  label?: string;
}

const Toggle: FC<ToggleProps> = ({ handleChangeToggle, checked, label }) => {
  return (
    <label className={classes.Container}>
      <input
        type="checkbox"
        value=""
        className="sr-only peer"
        onChange={handleChangeToggle}
        checked={checked}
      />
      <div
        className={
          'w-11 h-6 bg-secondary peer-focus:outline-none  ' +
          'dark:peer-focus:ring-green-800 rounded-full peer dark:bg-secondary ' +
          "peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] " +
          'after:absolute after:top-[2px] after:left-[2px] ' +
          'after:bg-white after:border-gray-300 after:border after:rounded-full ' +
          'after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary shadow-md'
        }
      />
      <span>{label}</span>
    </label>
  );
};

export default Toggle;
