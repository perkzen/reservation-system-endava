import React, { FC } from 'react';
import Office from '../../ui/Office/Office';
import { dummyOffice } from '../../ui/Office/dummyData';
import instance from '../../../axios';

const Home: FC = () => {
  const getApi = async () => {
    const res = await instance.get('/ping');
    console.log(res.data);
  };

  return (
    <div onClick={getApi}>
      <Office office={dummyOffice} />
    </div>
  );
};

export default Home;
