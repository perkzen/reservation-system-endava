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
  onActionClick?: (item: T, status?: boolean) => void;
  onPrimaryActionClick?: (item: T) => void;
  onSecondaryActionClick?: (item: T) => void;
  primaryActionText?: string;
  secondaryActionText?: string;
  onRowClick?: (item: T) => void;
  showStatus?: boolean;
  statusData?: boolean[];
  statusActiveText?: string;
  statusInactiveText?: string;
  statusPositiveText?: string;
  statusNegativeText?: string;
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
  onRowClick,
  showStatus,
  statusData,
  onPrimaryActionClick,
  onSecondaryActionClick,
  primaryActionText,
  secondaryActionText,
  statusActiveText,
  statusInactiveText,
  statusPositiveText,
  statusNegativeText,
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
                    {onPrimaryActionClick && (
                      <th scope="col" className="sr-only" colSpan={1} />
                    )}
                    {onSecondaryActionClick && (
                      <th scope="col" className="sr-only" colSpan={1} />
                    )}
                    {onActionClick && (
                      <th scope="col" className="sr-only" colSpan={1} />
                    )}
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
                              onClick={(e: any) =>
                                onRowClick &&
                                e.target.type !== 'button' &&
                                onRowClick(dataItem)
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
                                      {statusPositiveText}
                                    </span>
                                  ) : (
                                    <span className="inline-flex rounded-full bg-red-100 px-2 text-xs font-semibold leading-5 text-red-800">
                                      {statusNegativeText}
                                    </span>
                                  )}
                                </td>
                              )}

                              {onPrimaryActionClick && (
                                <td>
                                  <button
                                    type={'button'}
                                    className={'text-primary'}
                                    onClick={() =>
                                      onPrimaryActionClick(dataItem)
                                    }
                                  >
                                    {primaryActionText}
                                  </button>
                                </td>
                              )}
                              {onSecondaryActionClick && (
                                <td>
                                  <button
                                    type={'button'}
                                    className={'text-accent'}
                                    onClick={() =>
                                      onSecondaryActionClick(dataItem)
                                    }
                                  >
                                    {secondaryActionText}
                                  </button>
                                </td>
                              )}
                              {onActionClick && (
                                <td colSpan={1}>
                                  <button
                                    type={'button'}
                                    className={
                                      !statusData || statusData[index]
                                        ? 'text-red-600'
                                        : 'text-green-600'
                                    }
                                    onClick={() =>
                                      onActionClick(
                                        dataItem,
                                        statusData && statusData[index]
                                      )
                                    }
                                  >
                                    {!statusData || statusData[index]
                                      ? statusActiveText
                                      : statusInactiveText}
                                  </button>
                                </td>
                              )}
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
