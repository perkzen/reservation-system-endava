import React, { FC, useEffect } from 'react';
import Table, { TableHeader } from '../../ui/Table/Table';
import { Office } from '../../../store/models/Office';
import { useAppDispatch, useAppSelector } from '../../../store/app/hooks';
import { fetchOffices } from '../../../store/actions/officeActions';
import EmptyTable from '../../ui/Table/EmptyTable/EmptyTable';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../../routes';

const headers: TableHeader<Office>[] = [
  { accessor: 'name', label: 'Name' },
  { accessor: 'location', label: 'Location' },
  // active reservations, last updated?, created?
];

const AdminDashboard: FC = () => {
  const dispatch = useAppDispatch();
  const { offices } = useAppSelector((state) => state.office);
  const { loading } = useAppSelector((state) => state.global);

  const navigate = useNavigate();

  const isLoading = loading.filter((l) => l.actionType === fetchOffices.type);

  useEffect(() => {
    dispatch(fetchOffices());
  }, [dispatch]);

  const handleRowClick = (office: Office) => {
    navigate(`/${office.location}/${office._id}`, { state: office.name });
  };

  return (
    <Table
      data={offices}
      headers={headers}
      title={'Dashboard'}
      isLoading={isLoading.length > 0}
      emptyTableComponent={<EmptyTable title={'No offices to show'} />}
      onPrimaryActionClick={() => 1}
      primaryActionText={'Edit'}
      onSecondaryActionClick={() => 2}
      secondaryActionText={'Disable'}
      buttonLabel={'Add office'}
      buttonAction={() => navigate(routes.CREATE_OFFICE)}
      onRowClick={handleRowClick}
    />
  );
};

export default AdminDashboard;
