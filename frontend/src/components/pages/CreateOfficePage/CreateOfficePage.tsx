import React, {
  FC,
  MutableRefObject,
  Ref,
  useEffect,
  useRef,
  useState,
} from 'react';
import classes from './CreateOfficePage.module.scss';
import FileInput from '../../ui/FileInput/FileInput';
import Office from '../../ui/Office/Office';
import { Office as OfficeModel } from '../../../store/models/Office';
import { useAppDispatch, useAppSelector } from '../../../store/app/hooks';
import Button from '../../ui/Button/Button';
import { useTranslation } from 'react-i18next';
import {
  fetchOfficeJSON,
  saveOffice,
} from '../../../store/actions/officeActions';
import { Link, useParams } from 'react-router-dom';

const CreateOfficePage: FC = () => {
  const dispatch = useAppDispatch();
  const [office, setOffice] = useState<OfficeModel | undefined>();
  const { loading } = useAppSelector((state) => state.global);
  const { t } = useTranslation();
  const { currentOffice } = useAppSelector((state) => state.office);
  const { id } = useParams();

  const ref = useRef() as MutableRefObject<HTMLAnchorElement | undefined>;
  const buttonLoading = loading.filter((l) => l.actionType === saveOffice.type);
  const officeLoading = loading.filter(
    (l) => l.actionType === fetchOfficeJSON.type
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchOfficeJSON(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    setOffice(currentOffice);
  }, [currentOffice]);

  const handleSave = () => {
    if (!office) return;
    dispatch(saveOffice({ office, id }));
    if (!id) {
      setOffice(undefined);
    }
  };

  useEffect(() => {
    if (!office) return;
    if (!ref.current) return;
    const file = new File([JSON.stringify(office)], 'office.json', {
      type: 'application/json',
    });
    ref.current.href = window.URL.createObjectURL(file);
    ref.current.download = 'office.json';
  }, [office]);

  return (
    <div className={classes.Container}>
      <h1 className={classes.Title}>
        {id ? 'Update office' : 'Create office'}
      </h1>
      <div className={classes.ButtonContainer}>
        <FileInput
          className={classes.FileInput}
          accept={'application/json'}
          data={office}
          setData={setOffice}
        />
        <Button onClick={handleSave} loading={buttonLoading.length > 0}>
          Save office
        </Button>
      </div>
      <Office office={office} emptyText={'Upload file to see office preview'} />
      <Link to={'/files/office_example.json'} target="_blank">
        {t('download_office_json')}
      </Link>
      <Office
        office={office}
        emptyText={'Upload file to see office preview'}
        loading={officeLoading.length > 0}
        edit
      />
      {id ? (
        // eslint-disable-next-line jsx-a11y/anchor-is-valid
        <a ref={ref as unknown as Ref<HTMLAnchorElement> | undefined} href={''}>
          Download JSON
        </a>
      ) : (
        <Link to={'/files/office_example.json'} target="_blank">
          Example of a office.json file
        </Link>
      )}
    </div>
  );
};

export default CreateOfficePage;
