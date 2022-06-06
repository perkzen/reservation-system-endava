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
import { useTranslation } from 'react-i18next';

const AdminDashboard: FC = () => {
  const dispatch = useAppDispatch();
  const { dashboardOffices } = useAppSelector((state) => state.office);
  const { loading } = useAppSelector((state) => state.global);
  const { t } = useTranslation();

  const headers: TableHeader<Office>[] = [
    { accessor: 'name', label: t('name') },
    { accessor: 'location', label: t('location') },
  ];

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
          title: t('disable_office'),
          body: (
            <>
              {t('office_delete_warning')} <b>{office.name}</b> ?
            </>
          ),
          primaryActionText: t('disable'),
          primaryAction: () => dispatch(toggleOffice(office._id as string)),
          secondaryButtonText: t('close'),
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
      title={t('dashboard')}
      isLoading={isLoading.length > 0}
      emptyTableComponent={<EmptyTable title={t('no_offices')} />}
      onPrimaryActionClick={handleEditClick}
      primaryActionText={t('edit')}
      buttonLabel={t('add_office')}
      buttonAction={() => navigate(routes.CREATE_OFFICE)}
      showStatus
      statusActiveText={t('disable')}
      statusInactiveText={t('enable')}
      onActionClick={handleActionClick}
      statusData={dashboardOffices.map((office) => !office.disabled)}
      onRowClick={handleRowClick}
      statusPositiveText={t('active')}
      statusNegativeText={t('disabled')}
    />
  );
};

export default AdminDashboard;
