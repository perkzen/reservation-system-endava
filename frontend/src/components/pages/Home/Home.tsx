import React, { FC } from 'react';
import OfficeRoom from '../../ui/Office/OfficeRoom';

const Home: FC = () => {
  return (
    <div>
      <OfficeRoom row={3} column={5}></OfficeRoom>
    </div>
  );
};

export default Home;
