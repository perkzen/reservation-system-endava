import React, { FC, useEffect } from 'react';
import 'rc-slider/assets/index.css';
import Table, { TableHeader } from '../../ui/Table/Table';
import { ReservationTable } from '../../../store/models/Reservation';
import { useAppDispatch, useAppSelector } from '../../../store/app/hooks';
import { fetchReservations } from '../../../store/actions/reservationActions';
import { format } from 'date-fns';

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

  return (
    <div>
      <Table
        data={data}
        headers={headers}
        title={'Reservations'}
        buttonLabel={'New reservation'}
      />
    </div>
  );
};

export default Home;
