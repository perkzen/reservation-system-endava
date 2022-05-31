import React, { ReactNode } from 'react';
import classes from './Table.module.scss';
import { v4 } from 'uuid';
import Button from '../Button/Button';
import TableLoading from './TableLoading/TableLoading';

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
  isLoading?: boolean;
  emptyTableComponent: ReactNode;
  onActionClick: (id: string) => void;
  itemId: keyof T;
  itemIdAccessor: keyof T;
  itemFromAccessor: keyof T;
  itemLocationAccessor: keyof T;
  itemToAccessor: keyof T;
  onRowClick?: (
    id: string,
    from: number,
    to: number,
    location: string,
    e: any
  ) => void;
  showStatus?: boolean;
  statusData?: boolean[];
}

const Table = <T,>({
  data,
  headers,
  title,
  buttonAction,
  buttonLabel,
  emptyTableComponent,
  isLoading,
  onActionClick,
  itemId,
  itemIdAccessor,
  itemFromAccessor,
  itemToAccessor,
  itemLocationAccessor,
  onRowClick,
  showStatus,
  statusData,
}: TableProps<T>) => {
  return (
    <div className={classes.Container}>
      <div className={classes.Header}>
        <div>
          <h1>{title}</h1>
        </div>
        <div>
          {buttonLabel && <Button onClick={buttonAction}>{buttonLabel}</Button>}
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
                    {showStatus && (
                      <th>
                        <span>Status</span>
                      </th>
                    )}
                    <th scope="col" className="sr-only" colSpan={1} />
                  </tr>
                </thead>
                <tbody>
                  {isLoading ? (
                    <tr>
                      <td colSpan={headers.length + 1}>
                        <TableLoading />
                      </td>
                    </tr>
                  ) : (
                    <>
                      {data.length > 0 ? (
                        <>
                          {data.map((dataItem, index) => (
                            <tr
                              key={v4()}
                              className={onRowClick && classes.Clickable}
                              onClick={(e) =>
                                onRowClick &&
                                onRowClick(
                                  dataItem[itemIdAccessor] as unknown as string,
                                  dataItem[
                                    itemFromAccessor
                                  ] as unknown as number,
                                  dataItem[itemToAccessor] as unknown as number,
                                  dataItem[
                                    itemLocationAccessor
                                  ] as unknown as string,
                                  e
                                )
                              }
                            >
                              {headers.map((header) => (
                                <td key={v4()}>
                                  {
                                    dataItem[
                                      header.accessor
                                    ] as unknown as string
                                  }
                                </td>
                              ))}
                              {statusData && (
                                <td>
                                  {statusData[index] ? (
                                    <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                                      Active
                                    </span>
                                  ) : (
                                    <span className="inline-flex rounded-full bg-red-100 px-2 text-xs font-semibold leading-5 text-red-800">
                                      Expired
                                    </span>
                                  )}
                                </td>
                              )}
                              <td colSpan={1}>
                                <button
                                  type={'button'}
                                  onClick={() =>
                                    onActionClick(
                                      dataItem[itemId] as unknown as string
                                    )
                                  }
                                >
                                  {!statusData || statusData[index]
                                    ? 'Cancel'
                                    : 'Renew'}
                                </button>
                              </td>
                            </tr>
                          ))}
                        </>
                      ) : (
                        <tr>
                          <td colSpan={headers.length + 1}>
                            {emptyTableComponent}
                          </td>
                        </tr>
                      )}
                    </>
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
