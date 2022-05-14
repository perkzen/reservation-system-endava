import React, { FC } from 'react';
import OfficeRoom from '../../ui/Office/OfficeRoom';
import { dummyOffice } from '../../ui/Office/dummyData';

const Home: FC = () => {
  return (
    <div>
      <OfficeRoom office={dummyOffice} />
    </div>
  );
};

export default Home;
