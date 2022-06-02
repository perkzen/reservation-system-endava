import React, { FC, useEffect } from 'react';
import 'rc-slider/assets/index.css';
import Table, { TableHeader } from '../../ui/Table/Table';
import { ReservationTable } from '../../../store/models/Reservation';
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

const headers: TableHeader<ReservationTable>[] = [
  { accessor: 'office', label: 'Office' },
  { accessor: 'time', label: 'Time' },
  { accessor: 'date', label: 'Date' },
  { accessor: 'comment', label: 'Comment' },
];

const Home: FC = () => {
  const dispatch = useAppDispatch();
  const { history } = useAppSelector((state) => state.reservation);
  const { loading } = useAppSelector((state) => state.global);
  const navigate = useNavigate();

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

  const isLoading = loading.filter(
    (l) => l.actionType === fetchReservationHistory.type
  );

  const openDeleteModal = (id: string) => {
    dispatch(
      addModal({
        type: ModalType.DELETE,
        title: 'Delete reservation',
        body: 'Are you sure you want to delete your reservation?',
        primaryActionText: 'Delete',
        primaryAction: () => dispatch(deleteReservation(id)),
        secondaryButtonText: 'Close',
        secondaryAction: () => dispatch(removeModal()),
      })
    );
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
      title={'Your reservations'}
      isLoading={isLoading.length > 0}
      itemIdAccessor={'_id'}
      emptyTableComponent={<EmptyTable title={'No data to display'} />}
      onActionClick={openDeleteModal}
      showStatus
      statusData={data.map((d) => d.active)}
      onRowClick={handleRowClick}
    />
  );
};

export default Home;
