import React, { FC, useEffect } from 'react';
import 'rc-slider/assets/index.css';
import Table, { TableHeader } from '../../ui/Table/Table';
import {
  ReservationTable,
  ReservationType,
} from '../../../store/models/Reservation';
import { useAppDispatch, useAppSelector } from '../../../store/app/hooks';
import {
  deleteReservation,
  fetchReservationHistory,
} from '../../../store/actions/reservationActions';
import EmptyTable from '../../ui/Table/EmptyTable/EmptyTable';
import { addModal, removeModal } from '../../../store/features/globalSlice';
import { ModalType } from '../../../store/models/Modal';
import { getDate, getDateFromUnix, getTime } from '../../../utils/date';
import { useNavigate } from 'react-router-dom';
import { updateQuery } from '../../../store/features/officeSlice';
import { useTranslation } from 'react-i18next';

const Home: FC = () => {
  const dispatch = useAppDispatch();
  const { history } = useAppSelector((state) => state.reservation);
  const { loading } = useAppSelector((state) => state.global);
  const { details } = useAppSelector((state) => state.user);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const headers: TableHeader<ReservationTable>[] = [
    { accessor: 'office', label: t('office') },
    { accessor: 'date', label: t('date') },
    { accessor: 'time', label: t('time') },
    { accessor: 'comment', label: t('comment') },
  ];

  // convert Reservation to ReservationTable
  const data: ReservationTable[] = history.map((reservation) => {
    return {
      ...reservation,
      officeId: reservation.office._id,
      location: reservation.office.location,
      office: reservation.office.name,
      date: getDate(reservation.from),
      time: getTime(reservation.from) + 'h - ' + getTime(reservation.to) + 'h',
    };
  });

  useEffect(() => {
    dispatch(fetchReservationHistory());
  }, [dispatch]);

  useEffect(() => {
    if (details && details.redirectOnLogin) {
      navigate(
        `/${details!.primaryOffice.location}/${details!.primaryOffice._id}`,
        { state: details!.primaryOffice.name }
      );
    }
  }, [details]);

  const isLoading = loading.filter(
    (l) => l.actionType === fetchReservationHistory.type
  );

  const handleActionClick = (item: ReservationTable, active?: boolean) => {
    if (active) {
      dispatch(
        addModal({
          type: ModalType.DELETE,
          title: t('delete_reservation'),
          body: t('reservation_delete_warning'),
          primaryActionText: t('delete'),
          primaryAction: () => dispatch(deleteReservation(item._id)),
          secondaryButtonText: t('close'),
          secondaryAction: () => dispatch(removeModal()),
        })
      );
    } else {
      const nextDay = new Date();
      nextDay.setDate(nextDay.getDate() + 1);

      dispatch(
        addModal({
          type: ModalType.RESERVATION,
          title: t('confirm_reservation'),
          data: {
            _id: item._id,
            date: nextDay,
            from: getTime(item.from),
            to: getTime(item.to),
            workspaceId: item.workspaceId,
            office: item.officeId,
            type: ReservationType.RENEW,
          },
        })
      );
    }
  };

  const handleRowClick = (item: ReservationTable) => {
    navigate(`/${item.location}/${item.officeId}`, { state: item.office });
    dispatch(
      updateQuery({
        date: getDateFromUnix(item.from),
        from: item.from,
        to: item.to,
      })
    );
  };

  return (
    <Table
      data={data}
      headers={headers}
      title={t('your_reservations')}
      isLoading={isLoading.length > 0}
      emptyTableComponent={<EmptyTable title={t('empty_table')} />}
      onActionClick={handleActionClick}
      showStatus
      statusActiveText={t('cancel')}
      statusInactiveText={t('renew')}
      statusData={data.map((d) => d.active)}
      onRowClick={handleRowClick}
      statusPositiveText={t('active')}
      statusNegativeText={t('expired')}
    />
  );
};

export default Home;
