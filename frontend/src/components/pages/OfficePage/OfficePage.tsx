import React, { useEffect, useState } from 'react';
import { dateToUTC, generateDates } from '../../../utils/date';
import classes from './OfficePage.module.scss';
import DateCard from '../../ui/DateCard/DateCard';
import { format } from 'date-fns';
import TimeSlider from '../../ui/TimeSlider/TimeSlider';
import { workingHours } from '../../../constants/timeConstants';
import Office from '../../ui/Office/Office';
import { useAppDispatch, useAppSelector } from '../../../store/app/hooks';
import { fetchOffice } from '../../../store/actions/officeActions';
import { useParams } from 'react-router-dom';
import Carousel from '../../ui/Carousel/Carousel';
import Card from '../../ui/Card/Card';
import Toggle from '../../ui/Toggle/Toggle';
import { DATE, WEEK_DAY } from '../../../constants/dateFormats';
import Button from '../../ui/Button/Button';
import { ModalType } from '../../../store/models/Modal';
import { addModal } from '../../../store/features/globalSlice';
import {
  removeAllWorkspaceFromReservations,
  toggleMultipleReservations,
} from '../../../store/features/reservationsSlice';

const OfficePage = () => {
  const dispatch = useAppDispatch();
  const { currentOffice } = useAppSelector((state) => state.office);
  const { reservedWorkspaces, multipleReservations } = useAppSelector(
    (state) => state.reservation
  );
  const { loading } = useAppSelector((state) => state.global);
  const isLoading = loading.filter((l) => l.actionType === fetchOffice.type);

  const [from, setFrom] = useState<number>(8);
  const [to, setTo] = useState<number>(17);
  const [dates] = useState<Date[]>(generateDates());
  const [selectedDay, setSelectedDay] = useState<Date>(new Date());
  const { id } = useParams();

  const [fullDay, setFullDay] = useState<boolean>(true);

  useEffect(() => {
    if (id) {
      dispatch(
        fetchOffice({
          _id: id,
          from: dateToUTC(selectedDay, from),
          to: dateToUTC(selectedDay, to),
        })
      );
    }
  }, [dispatch, selectedDay, from, to, id]);

  const handleChangeSlider = (value: number | number[]) => {
    if (value instanceof Array) {
      if (value[0] === 8 && value[1] === 17) setFullDay(true);
      setFrom(value[0]);
      setTo(value[1]);
    }
    if (fullDay) setFullDay(false);
  };

  const toggleFullDay = () => {
    if (!fullDay) {
      setFrom(8);
      setTo(17);
    }
    setFullDay(!fullDay);
  };

  const handleToggleMultipleReservations = () => {
    dispatch(toggleMultipleReservations());
    dispatch(removeAllWorkspaceFromReservations());
  };

  const handleMultipleReservations = () => {
    if (reservedWorkspaces.length !== 0) {
      dispatch(
        addModal({
          type: ModalType.RESERVATION,
          title: 'Confirm reservation',
          data: {
            date: selectedDay,
            from: from,
            to: to,
            workspaceId: reservedWorkspaces,
            office: currentOffice?._id,
          },
        })
      );
      dispatch(removeAllWorkspaceFromReservations());
    }
  };

  return (
    <div className={classes.Container}>
      <Carousel>
        {dates.map((date: Date, index: number) => {
          return (
            <DateCard
              key={index}
              day={format(date, WEEK_DAY)}
              date={date}
              selected={format(date, DATE) === format(selectedDay, DATE)}
              onClick={() => setSelectedDay(date)}
            />
          );
        })}
      </Carousel>
      <Card>
        <div className={classes.Flex}>
          <h1>Pick your time</h1>
        </div>
        <TimeSlider
          min={8}
          max={17}
          marks={workingHours}
          defaultValue={[from, to]}
          value={[from, to]}
          tipFormatter={(value) => `${value}`}
          tipProps={{}}
          onChange={handleChangeSlider}
        />
      </Card>
      <div>
        <Toggle
          handleChangeToggle={toggleFullDay}
          checked={fullDay}
          label={'Full day'}
        />
        <Button
          disabled={!multipleReservations}
          onClick={handleMultipleReservations}
        >
          Confirm
        </Button>
      </div>
      <div>
        <Toggle
          handleChangeToggle={handleToggleMultipleReservations}
          checked={multipleReservations}
          label={'Multiple reservations'}
        />
      </div>
      <Office
        office={currentOffice}
        currentDate={selectedDay}
        from={from}
        to={to}
        loading={isLoading.length > 0}
      />
    </div>
  );
};

export default OfficePage;
