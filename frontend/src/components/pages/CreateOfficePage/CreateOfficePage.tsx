import React, { FC, useState } from 'react';
import classes from './CreateOfficePage.module.scss';
import FileInput from '../../ui/FileInput/FileInput';
import Office from '../../ui/Office/Office';
import { Office as OfficeModel } from '../../../store/models/Office';
import { useAppDispatch } from '../../../store/app/hooks';
import Button from '../../ui/Button/Button';
import { saveOffice } from '../../../store/actions/officeActions';

const CreateOfficePage: FC = () => {
  const dispatch = useAppDispatch();
  const [office, setOffice] = useState<OfficeModel | undefined>();

  const handleSave = () => {
    if (!office) return;
    dispatch(saveOffice(office));
  };

  return (
    <div className={classes.Container}>
      <h1 className={classes.Title}>Create office</h1>
      <FileInput accept={'application/json'} setData={setOffice} />
      <Office office={office} emptyText={'Upload file to see office preview'} />
      <Button onClick={handleSave}>Save office</Button>
    </div>
  );
};

export default CreateOfficePage;
