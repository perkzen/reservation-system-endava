import React, { useEffect, useState } from 'react';
import { dateToUTC, generateDates } from '../../../utils/date';
import classes from '../Home/Home.module.scss';
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
import { addModal } from '../../../store/features/globalSlice';
import { ModalType } from '../../../store/models/Modal';

const OfficePage = () => {
  const dispatch = useAppDispatch();
  const { currentOffice } = useAppSelector((state) => state.office);
  const { loading } = useAppSelector((state) => state.global);
  const isLoading = loading.filter((l) => l.actionType === fetchOffice.type);

  const [from, setFrom] = useState<number>(8);
  const [to, setTo] = useState<number>(17);
  const [dates] = useState<Date[]>(generateDates());
  const [selectedDay, setSelectedDay] = useState<Date>(new Date());
  const { id } = useParams();

  const [checked, setChecked] = useState<boolean>(true);
  const [checkedReservations, setCheckedReservations] =
    useState<boolean>(false);
  const [workspacesIds, setWorkspacesIds] = useState<string[]>([]);

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
      if (value[0] === 8 && value[1] === 17) setChecked(true);
      setFrom(value[0]);
      setTo(value[1]);
    }
    if (checked) setChecked(false);
  };

  const toggleFullDay = () => {
    if (!checked) {
      setFrom(8);
      setTo(17);
    }
    setChecked(!checked);
  };

  const toggleMultipleReservations = () => {
    setCheckedReservations(!checkedReservations);
    if (!checkedReservations) setWorkspacesIds([]);
  };

  const handleClick = () => {
    if (!currentOffice) return;
    dispatch(
      addModal({
        type: ModalType.RESERVATION,
        title: 'Confirm reservation',
        data: {
          date: selectedDay,
          from: from,
          to: to,
          workspaceId: [workspacesIds],
          office: currentOffice._id,
        },
      })
    );
  };

  return (
    <div className={classes.Container}>
      <Card>
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
      </Card>
      <Card>
        <div className={classes.Flex}>
          <h1>Pick your time</h1>
          <Toggle
            handleChangeToggle={toggleFullDay}
            checked={checked}
            label={'Full day'}
          />
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
      <div className={classes.OfficeContainer}>
        {/*<OfficeLegend />*/}
        <Office
          office={currentOffice}
          currentDate={selectedDay}
          from={from}
          to={to}
          loading={isLoading.length > 0}
          multipleReservations={checkedReservations}
          workspacesIds={workspacesIds}
          setWorkspacesIds={setWorkspacesIds}
        />
      </div>
      <Toggle
        handleChangeToggle={toggleMultipleReservations}
        checked={checkedReservations}
        label={'Multiple reservations'}
      />
      <Button disabled={!checkedReservations} onClick={handleClick}>
        Confirm reservations
      </Button>
    </div>
  );
};

export default OfficePage;
