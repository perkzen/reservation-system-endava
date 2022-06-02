import React, { FC, useEffect } from 'react';
import Table, { TableHeader } from '../../ui/Table/Table';
import { Office } from '../../../store/models/Office';
import { useAppDispatch, useAppSelector } from '../../../store/app/hooks';
import {
  fetchAllOffices,
  toggleOffice,
} from '../../../store/actions/officeActions';
import EmptyTable from '../../ui/Table/EmptyTable/EmptyTable';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../../routes';
import { addModal, removeModal } from '../../../store/features/globalSlice';
import { ModalType } from '../../../store/models/Modal';

const headers: TableHeader<Office>[] = [
  { accessor: 'name', label: 'Name' },
  { accessor: 'location', label: 'Location' },
  // active reservations, last updated?, created?
];

const AdminDashboard: FC = () => {
  const dispatch = useAppDispatch();
  const { dashboardOffices } = useAppSelector((state) => state.office);
  const { loading } = useAppSelector((state) => state.global);

  const navigate = useNavigate();

  const isLoading = loading.filter(
    (l) => l.actionType === fetchAllOffices.type
  );

  useEffect(() => {
    dispatch(fetchAllOffices());
  }, [dispatch]);

  const handleRowClick = (office: Office) => {
    navigate(`/${office.location}/${office._id}`, { state: office.name });
  };

  const handleActionClick = (office: Office, disabled?: boolean) => {
    if (disabled) {
      dispatch(
        addModal({
          type: ModalType.DELETE,
          title: 'Disable office',
          body: (
            <>
              Are you sure, you want to disable office <b>{office.name}</b> ?
            </>
          ),
          primaryActionText: 'Disable',
          primaryAction: () => dispatch(toggleOffice(office._id as string)),
          secondaryButtonText: 'Close',
          secondaryAction: () => dispatch(removeModal()),
        })
      );
    } else {
      dispatch(toggleOffice(office._id as string));
    }
  };

  const handleEditClick = (office: Office) => {
    navigate(`${routes.EDIT_OFFICE}/${office._id}`, {
      state: office.name,
    });
  };

  return (
    <Table
      data={dashboardOffices}
      headers={headers}
      title={'Dashboard'}
      isLoading={isLoading.length > 0}
      emptyTableComponent={<EmptyTable title={'No offices to show'} />}
      onPrimaryActionClick={handleEditClick}
      primaryActionText={'Edit'}
      buttonLabel={'Add office'}
      buttonAction={() => navigate(routes.CREATE_OFFICE)}
      showStatus
      statusActiveText={'Disable'}
      statusInactiveText={'Enable'}
      onActionClick={handleActionClick}
      statusData={dashboardOffices.map((office) => !office.disabled)}
      onRowClick={handleRowClick}
    />
  );
};

export default AdminDashboard;
