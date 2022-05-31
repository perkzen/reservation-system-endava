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
import { getDate, getTime } from '../../../utils/date';
import { useNavigate } from 'react-router-dom';

const headers: TableHeader<ReservationTable>[] = [
  { accessor: 'office', label: 'Office' },
  { accessor: 'workspaceId', label: 'Workspace' },
  { accessor: 'comment', label: 'Comment' },
  { accessor: 'date', label: 'Date' },
  { accessor: 'time', label: 'Time' },
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
      from: reservation.from,
      to: reservation.to,
    };
  });

  useEffect(() => {
    dispatch(fetchReservationHistory());
  }, [dispatch]);

  const isLoading = loading.filter(
    (l) => l.actionType === fetchReservationHistory.type
  );

  console.log(data);

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

  return (
    <div>
      <Table
        data={data}
        headers={headers}
        title={'My reservations'}
        isLoading={isLoading.length > 0}
        itemIdAccessor={'officeId'}
        itemFromAccessor={'from'}
        itemToAccessor={'to'}
        itemLocationAccessor={'location'}
        emptyTableComponent={<EmptyTable title={'No data to display'} />}
        onActionClick={openDeleteModal}
        showStatus
        statusData={data.map((d) => d.active)}
        onRowClick={(id, from, to, location) => {
          console.log(id, from, to, location);
          navigate(`/${location}/${id}?from=${from}&to=${to}`);
        }}
      />
    </div>
  );
};

export default Home;
