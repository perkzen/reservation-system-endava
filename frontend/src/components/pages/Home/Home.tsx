import React, { FC } from 'react';
import Office from '../../ui/Office/Office';
import { dummyOffice } from '../../ui/Office/dummyData';

const Home: FC = () => {
  return (
    <div>
      <Office office={dummyOffice} />
    </div>
  );
};

export default Home;
