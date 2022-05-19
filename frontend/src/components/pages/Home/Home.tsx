import React, { FC } from 'react';
import 'rc-slider/assets/index.css';
import { TableHeader } from '../../ui/Table/Table';
import { ReservationTable } from '../../../store/models/Reservation';

const headers: TableHeader<ReservationTable>[] = [
  { accessor: 'office', label: 'Office' },
  { accessor: 'workspaceId', label: 'Workspace' },
  { accessor: 'comment', label: 'Comment' },
  { accessor: 'from', label: 'From' },
  { accessor: 'to', label: 'To' },
];

const Home: FC = () => {
  return <div></div>;
};

export default Home;
