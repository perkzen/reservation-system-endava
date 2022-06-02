import React, { useEffect, useState } from 'react';
import { dateToUTC, generateDates, getTime } from '../../../utils/date';
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
import {
  clearOffice,
  clearQuery,
  updateQuery,
} from '../../../store/features/officeSlice';

const OfficePage = () => {
  const dispatch = useAppDispatch();
  const { currentOffice, query } = useAppSelector((state) => state.office);
  const { settings } = useAppSelector((state) => state.settings);
  const { reservedWorkspaces, multipleReservations } = useAppSelector(
    (state) => state.reservation
  );

  const { loading } = useAppSelector((state) => state.global);
  const isLoading = loading.filter((l) => l.actionType === fetchOffice.type);

  const [dates] = useState<Date[]>(
    generateDates(settings.numOfDaysDisplayed, settings.showWeekends)
  );

  const { id } = useParams();

  const [fullDay, setFullDay] = useState<boolean>(true);
  const [selectedDay, setSelectedDay] = useState<Date>(query.date);
  const [from, setFrom] = useState<number>(getTime(query.from));
  const [to, setTo] = useState<number>(getTime(query.to));

  useEffect(() => {
    dispatch(removeAllWorkspaceFromReservations());
    setFrom(getTime(query.from));
    setTo(getTime(query.to));
    setSelectedDay(query.date);
  }, [query, dispatch]);

  useEffect(() => {
    return () => {
      dispatch(clearQuery());
      dispatch(removeAllWorkspaceFromReservations());
      dispatch(clearOffice());
    };
  }, [dispatch]);

  useEffect(() => {
    dispatch(
      updateQuery({
        date: selectedDay,
        from: dateToUTC(selectedDay, from),
        to: dateToUTC(selectedDay, to),
      })
    );
  }, [dispatch, selectedDay, from, to]);

  useEffect(() => {
    if (id) {
      dispatch(
        fetchOffice({
          ...query,
          _id: id,
        })
      );
    }
  }, [dispatch, id, query]);

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
    }
  };

  return (
    <div className={classes.Container}>
      <div className={classes.Flex}>
        <h1>Pick your workspace</h1>
      </div>
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
      <div className={classes.MultipleReservation}>
        <div>
          <Toggle
            handleChangeToggle={toggleFullDay}
            checked={fullDay}
            label={'Full day'}
          />
          <br />
          <Toggle
            handleChangeToggle={handleToggleMultipleReservations}
            checked={multipleReservations}
            label={'Multiple reservations'}
          />
        </div>
        {multipleReservations && (
          <Button
            disabled={!multipleReservations}
            onClick={handleMultipleReservations}
          >
            Confirm
          </Button>
        )}
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
