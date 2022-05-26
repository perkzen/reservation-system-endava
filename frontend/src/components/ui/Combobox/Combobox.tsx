import { Fragment, useEffect, useState } from 'react';
import { Combobox, Transition } from '@headlessui/react';
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid';
import classes from './Combobox.module.scss';
import { v4 } from 'uuid';

interface ComboboxProps<T> {
  data: T[];
  queryAccessor: keyof T;
  onStateChange: any;
}

const ComboBox = <T,>({
  data,
  queryAccessor,
  onStateChange,
}: ComboboxProps<T>) => {
  const [selected, setSelected] = useState(data[0]);
  const [query, setQuery] = useState('');

  const filteredData =
    query === ''
      ? data
      : data.filter((item: T) =>
          (item[queryAccessor] as unknown as string)
            .toLowerCase()
            .replace(/\s+/g, '')
            .includes(query.toLowerCase().replace(/\s+/g, ''))
        );

  // useEffect(() => {
  //   onStateChange(selected);
  // }, [selected]);

  return (
    <div className={classes.Container}>
      <Combobox value={selected} onChange={setSelected}>
        <div className={classes.Wrapper}>
          <div className={classes.InputContainer}>
            <Combobox.Input
              className={classes.Input}
              displayValue={(data: T) =>
                data[queryAccessor] as unknown as string | ''
              }
              onChange={(event) => setQuery(event.target.value)}
            />
            <Combobox.Button className={classes.Button}>
              <SelectorIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </Combobox.Button>
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery('')}
          >
            <Combobox.Options className={classes.Options}>
              {filteredData.length === 0 && query !== '' ? (
                <div className={classes.NoOptions}>Nothing found.</div>
              ) : (
                filteredData.map((data: T) => (
                  <Combobox.Option
                    key={v4()}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? 'bg-textLight text-white' : 'text-gray-900'
                      }`
                    }
                    value={data}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? 'font-medium' : 'font-normal'
                          }`}
                        >
                          {data[queryAccessor] as unknown as string}
                        </span>
                        {selected ? (
                          <span
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                              active ? 'text-white' : 'text-teal-600'
                            }`}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  );
};

export default ComboBox;
