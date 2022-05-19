import React, { FC, useEffect } from 'react';
import 'rc-slider/assets/index.css';
import Table, { TableHeader } from '../../ui/Table/Table';
import { ReservationTable } from '../../../store/models/Reservation';
import { useAppDispatch, useAppSelector } from '../../../store/app/hooks';
import { fetchReservations } from '../../../store/actions/reservationActions';
import { format } from 'date-fns';
import EmptyTable from '../../ui/Table/EmptyTable/EmptyTable';

const headers: TableHeader<ReservationTable>[] = [
  { accessor: 'office', label: 'Office' },
  { accessor: 'workspaceId', label: 'Workspace' },
  { accessor: 'comment', label: 'Comment' },
  { accessor: 'from', label: 'From' },
  { accessor: 'to', label: 'To' },
];

const Home: FC = () => {
  const dispatch = useAppDispatch();
  const { reservations } = useAppSelector((state) => state.reservation);
  const { loading } = useAppSelector((state) => state.global);

  // convert Reservation to ReservationTable
  const data: ReservationTable[] = reservations.map((reservation) => {
    return {
      ...reservation,
      office: reservation.office.name,
      from: format(reservation.from, 'PPpp'),
      to: format(reservation.to, 'PPpp'),
    };
  });

  useEffect(() => {
    dispatch(fetchReservations());
  }, [dispatch]);

  const isLoading = loading.filter(
    (l) => l.actionType === fetchReservations.type
  );

  return (
    <div>
      <Table
        data={data}
        headers={headers}
        title={'Reservations'}
        buttonLabel={'New reservation'}
        isLoading={isLoading.length > 0}
        emptyTableComponent={<EmptyTable title={'No data to display'} />}
      />
    </div>
  );
};

export default Home;
