import React, { useState } from 'react';
import { orderBy, cloneDeep } from 'lodash';
import moment from 'moment-timezone';
//components
import CalendarHead from './CalendarHead';
import CalendarBody from './CalendarBody';
//UI
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
//data
import { data } from '../data';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.typography.pxToRem(55),
  },
}));

const Calendar = () => {
  const classes = useStyles();
  const [state, setState] = useState({
    startedAt: moment(),
    timeZone: 'Asia/Taipei',
    timeZoneOffset: moment().utcOffset(),
  });

  const onWeekChange = (startedAt) => {
    setState({ ...state, startedAt });
  };

  const reformatData = (data) => {
    let formattedData = {};
    let dataArray = [];
    let availableTimeArray = reformDataObjects(data, 'available');
    let bookedTimeArray = reformDataObjects(data, 'booked');

    dataArray.push(...availableTimeArray, ...bookedTimeArray);
    dataArray = orderBy(dataArray, ['time'], ['asc']);

    formattedData['data'] = dataArray;
    formattedData['validDatesOfTheWeek'] = getVaildDatesOfTheWeek(dataArray);

    return formattedData;
  };

  const reformDataObjects = (data, type) => {
    let array = [];
    const { timeZone } = state;
    let dataCopy = cloneDeep(data);
    dataCopy[type].forEach((item, index) => {
      let newObj = {};
      let startTime = moment(item.start).clone();
      let endTime = moment(item.end).clone();
      while (startTime < endTime) {
        newObj['date'] = startTime.clone().tz(timeZone).format('ddd');
        newObj['day'] = startTime.clone().tz(timeZone).format('DD');
        newObj['time'] = startTime.clone();
        newObj['type'] = type;

        array.push({ ...newObj });
        startTime.add(0.5, 'hour');
      }
    });

    return array;
  };

  const getVaildDatesOfTheWeek = (data) => {
    let vaildDates = {};
    let dataCopy = cloneDeep(data);
    let currentWeek = [];
    let startOfWeek = state.startedAt.clone().startOf('week');
    let endOfWeek = state.startedAt.clone().endOf('week');

    dataCopy.forEach((item) => {
      const timeCopy = item.time.clone();
      if (timeCopy.isAfter(startOfWeek) && timeCopy.isBefore(endOfWeek)) {
        currentWeek.push(item);
      }
    });

    currentWeek.forEach((item) => {
      if (item.type === 'available' && item.time.clone().isAfter(moment().day(-1))) {
        vaildDates[item.date] = item.day;
      }
    });

    return vaildDates;
  };

  return (
    <Container maxWidth="md" className={classes.container}>
      <Grid container justify="center" alignItems="center" spacing={1}>
        <Grid item xs={12}>
          <CalendarHead
            startedAt={state.startedAt}
            timeZone={state.timeZone}
            timeZoneOffset={state.timeZoneOffset}
            onWeekChange={onWeekChange}
          />
        </Grid>
        <Grid item xs={12}>
          <CalendarBody startedAt={state.startedAt} timeZone={state.timeZone} formattedData={reformatData(data)} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Calendar;
