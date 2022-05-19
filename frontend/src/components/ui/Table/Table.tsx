import React from 'react';
import classes from './Table.module.scss';
import { v4 } from 'uuid';

export interface TableHeader<T> {
  label: string;
  accessor: keyof T;
}

interface TableProps<T> {
  data: T[];
  headers: TableHeader<T>[];
  title: string;
  className?: string;
  buttonAction?: () => void;
  buttonLabel?: string;
}

const Table = <T,>({
  data,
  headers,
  title,
  buttonAction,
  buttonLabel,
}: TableProps<T>) => {
  return (
    <div className={classes.Container}>
      <div className={classes.Header}>
        <div>
          <h1>{title}</h1>
        </div>
        <div>
          {buttonAction && (
            <button type="button" onClick={buttonAction}>
              {buttonLabel}
            </button>
          )}
        </div>
      </div>
      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table>
                <thead>
                  <tr>
                    {headers.map((header) => (
                      <th key={v4()}>
                        <span>{header.label}</span>
                      </th>
                    ))}
                    <th scope="col">
                      <span>Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.length > 0 ? (
                    <>
                      {data.map((dataItem, dataIndex) => (
                        <tr key={v4()}>
                          <td>{dataIndex + 1}</td>
                          {headers.map((header) => (
                            <td key={v4()}>
                              {dataItem[header.accessor] as unknown as string}
                            </td>
                          ))}
                          <td colSpan={headers.length + 1}>
                            <button>Cancel</button>
                          </td>
                        </tr>
                      ))}
                    </>
                  ) : (
                    <div>empty table</div>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;
