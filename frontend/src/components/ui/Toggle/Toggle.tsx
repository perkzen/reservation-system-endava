import React, { FC } from 'react';

interface ToggleProps {
  handleChangeToggle: () => void;
  checked: boolean;
}

const Toggle: FC<ToggleProps> = ({ handleChangeToggle, checked }) => {
  return (
    <label
      htmlFor="default-toggle"
      className="inline-flex relative items-center cursor-pointer"
    >
      <input
        type="checkbox"
        value=""
        id="default-toggle"
        className="sr-only peer"
        onChange={handleChangeToggle}
        checked={checked}
      />
      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none  dark:peer-focus:ring-green-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
      <span className="ml-3 text-sm font-medium text-primary ">Full day</span>
    </label>
  );
};

export default Toggle;
