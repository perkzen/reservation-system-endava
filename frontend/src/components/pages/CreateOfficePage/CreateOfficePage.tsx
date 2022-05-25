import React, { FC, useState } from 'react';
import classes from './CreateOfficePage.module.scss';
import FileInput from '../../ui/FileInput/FileInput';
import Office from '../../ui/Office/Office';
import { Office as OfficeModel } from '../../../store/models/Office';
import { useAppDispatch, useAppSelector } from '../../../store/app/hooks';
import Button from '../../ui/Button/Button';
import { saveOffice } from '../../../store/actions/officeActions';
import { Link } from 'react-router-dom';

const CreateOfficePage: FC = () => {
  const dispatch = useAppDispatch();
  const [office, setOffice] = useState<OfficeModel | undefined>();
  const { loading } = useAppSelector((state) => state.global);

  const isLoading = loading.filter((l) => l.actionType === saveOffice.type);

  const handleSave = () => {
    if (!office) return;
    dispatch(saveOffice(office));
    setOffice(undefined);
  };

  return (
    <div className={classes.Container}>
      <h1 className={classes.Title}>Create office</h1>
      <div className={classes.ButtonContainer}>
        <FileInput
          className={classes.FileInput}
          accept={'application/json'}
          data={office}
          setData={setOffice}
        />
        <Button onClick={handleSave} loading={isLoading.length > 0}>
          Save office
        </Button>
      </div>
      <Office office={office} emptyText={'Upload file to see office preview'} />
      <Link to={'/files/office_example.json'} target="_blank">
        Download example of a office.json file
      </Link>
    </div>
  );
};

export default CreateOfficePage;
