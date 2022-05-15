import React, { FC } from 'react';
import OfficeRoom from '../../ui/OfficeRoom/OfficeRoom';
import { dummyOffice } from '../../ui/OfficeRoom/dummyData';

const Home: FC = () => {
  return (
    <div>
      <OfficeRoom office={dummyOffice} />
    </div>
  );
};

export default Home;
