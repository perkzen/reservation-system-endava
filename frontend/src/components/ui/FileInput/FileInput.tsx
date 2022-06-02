import React, { ChangeEvent, useEffect, useState } from 'react';
import classes from './FileInput.module.scss';
import { toast } from 'react-toastify';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import { classNames } from '../../../utils/classNames';
import { useTranslation } from 'react-i18next';

type AcceptType = 'application/json';

interface FileInputProps<T> {
  accept: AcceptType;
  data?: T;
  setData: (data: T | undefined) => void;
  className?: string;
}

const FileInput = <T,>({
  accept,
  data,
  setData,
  className = '',
}: FileInputProps<T>) => {
  const [file, setFile] = useState<File | null>();
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    if (!data) {
      setFile(null);
    }
  }, [data]);

  const handleRemove = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    e.preventDefault();
    if (!file) return;
    setFile(null);
    setData(undefined);
  };

  function readFile(input: ChangeEvent) {
    setLoading(true);

    const file = (input.target as HTMLInputElement).files?.[0];

    if (!file) return;

    setFile(file);

    const reader = new FileReader();
    reader.readAsText(file);

    reader.onload = () => {
      try {
        const data = JSON.parse(reader.result as string) as T;
        setData(data);
      } catch (e) {
        const err = e as Error;
        const message = err.message;
        toast.error(message);
      }
    };

    reader.onerror = () => {
      toast.error(reader.error?.message);
    };

    setLoading(false);
  }

  return (
    <div className={classNames(classes.Container, className)}>
      <label className={classes.FileInput}>
        {loading ? (
          <span>
            <LoadingSpinner />
            {t('loading')}
          </span>
        ) : (
          <>
            {file ? (
              <span onClick={handleRemove}>Remove file</span>
            ) : (
              <span>
                <input type="file" accept={accept} onChange={readFile} />
                {t('selectFile')}
              </span>
            )}
          </>
        )}
        <input
          type="text"
          value={file?.name ? file?.name : t('noFileSelected')}
          readOnly
        />
      </label>
    </div>
  );
};

export default FileInput;
