import React from 'react';
import moment from 'moment-timezone';
import { useTranslation } from 'react-i18next';
//UI
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
//data
import { weekDays } from '../data';

const useStyles = makeStyles((theme) => ({
  column: {
    padding: theme.typography.pxToRem(5),
    width: '14.28%',
  },
  rowHead: {
    padding: theme.typography.pxToRem(15),
    height: theme.typography.pxToRem(90),
    borderTop: `solid ${theme.typography.pxToRem(3.5)} ${theme.palette.grey[50]}`,
  },
  rowHeadActive: {
    borderTop: `solid ${theme.typography.pxToRem(3.5)} ${theme.palette.primary.main}`,
  },
  rowHeadText: {
    color: theme.palette.grey[50],
  },
  rowHeadTextActive: {
    color: theme.palette.grey.black,
  },
  rows: {
    color: theme.palette.primary.main,
    height: theme.typography.pxToRem(80),
  },
  row: {
    height: theme.typography.pxToRem(30),
    color: theme.palette.grey[50],
  },
  rowActive: {
    color: theme.palette.primary.main,
  },
  rowText: {
    fontSize: theme.typography.pxToRem(12),
    fontWeight: 700,
  },
}));

const CalendarBody = (props) => {
  const classes = useStyles();
  const { t } = useTranslation(['translation']);
  const { startedAt, formattedData, timeZone } = props;

  const getColumns = () => {
    const weekStart = startedAt.clone().startOf('week');
    let days = [];
    for (let i = 0; i <= 6; i++) {
      days.push(moment(weekStart).add(i, 'days').format('DD'));
    }
    return days;
  };

  const isValidDate = (date, day) => {
    const { validDatesOfTheWeek } = formattedData;
    return validDatesOfTheWeek[date] === day;
  };

  const isActiveText = (date, day) => {
    return isValidDate(date, day) ? classes.rowHeadTextActive : classes.rowHeadText;
  };

  const isActiveRow = (type) => {
    return type === 'available' ? classes.rowActive : null;
  };

  const checkReplication = (current, last) => {
    return last && current.time.clone().isSame(last.time.clone());
  };

  return (
    <Grid container>
      {getColumns().map((day, colIndex) => {
        return (
          <Grid item container key={colIndex} className={classes.column}>
            <Grid
              item
              container
              className={`${classes.rowHead} ${isValidDate(weekDays[colIndex], day) ? classes.rowHeadActive : null}`}
            >
              <Grid item xs={12} container justify="center">
                <Typography variant="subtitle1" className={isActiveText(weekDays[colIndex], day)}>
                  {t(weekDays[colIndex])}
                </Typography>
              </Grid>
              <Grid item xs={12} container justify="center">
                <Typography variant="subtitle1" className={isActiveText(weekDays[colIndex], day)}>
                  {day}
                </Typography>
              </Grid>
            </Grid>
            <Grid item container className={classes.rows}>
              {formattedData.data.map((row, rowIndex) => {
                if (row.date === weekDays[colIndex] && row.day === day) {
                  if (checkReplication(row, formattedData.data[rowIndex - 1])) {
                    return;
                  }

                  return (
                    <Grid
                      item
                      xs={12}
                      container
                      justify="center"
                      className={`${classes.row} ${isActiveRow(row.type)}`}
                      key={rowIndex}
                    >
                      <Typography className={classes.rowText}>{row.time.tz(timeZone).format('HH:mm')}</Typography>
                    </Grid>
                  );
                }
              })}
            </Grid>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default CalendarBody;
