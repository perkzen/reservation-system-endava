import React, { FC, useEffect, useState } from 'react';
import classes from './Combobox.module.scss';
import { Combobox as ComboboxUI } from '@headlessui/react';
import { classNames } from '../../../utils/classNames';
import { v4 } from 'uuid';
import { SelectorIcon, CheckIcon } from '@heroicons/react/solid';

interface ComboboxProps {
  options: string[];
  label: string;
  query: string;
  setQuery: (query: string) => void;
  selected?: string;
  setSelected: (selected: string) => void;
}

const Combobox: FC<ComboboxProps> = ({
  options,
  query,
  setQuery,
  selected,
  setSelected,
  label,
}) => {
  const [filteredData, setFilteredData] = useState(options);

  useEffect(() => {
    setFilteredData(
      options.filter((item) => {
        return item.toLowerCase().includes(query.toLowerCase());
      })
    );
  }, [options, query]);

  return (
    <ComboboxUI
      as="div"
      value={selected}
      onChange={setSelected}
      className={'relative  w-full'}
    >
      <div className="relative">
        <ComboboxUI.Input
          autoComplete={'off'}
          placeholder={' '}
          className={classes.Input}
          onChange={(event: any) => setQuery(event.target.value)}
          displayValue={(item: string) => item}
        />
        <ComboboxUI.Label className={classes.Label}>{label}</ComboboxUI.Label>
        <ComboboxUI.Button className={classes.Button}>
          <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
        </ComboboxUI.Button>

        {filteredData.length > 0 && (
          <ComboboxUI.Options className={classes.Options}>
            {filteredData.map((item) => (
              <ComboboxUI.Option
                key={v4()}
                value={item}
                className={({ active }) =>
                  classNames(
                    'relative cursor-default select-none py-2 pl-8 pr-4',
                    active ? 'bg-primary text-white' : 'text-gray-900'
                  )
                }
              >
                {({ selected }) => (
                  <>
                    <span className={classNames('block truncate')}>{item}</span>

                    {selected && (
                      <span
                        className={classNames(
                          'absolute inset-y-0 left-0 flex items-center pl-1.5'
                        )}
                      >
                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    )}
                  </>
                )}
              </ComboboxUI.Option>
            ))}
          </ComboboxUI.Options>
        )}
      </div>
    </ComboboxUI>
  );
};

export default Combobox;
