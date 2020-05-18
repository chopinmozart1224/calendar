import React from 'react';
import moment from 'moment-timezone';
import { useTranslation } from 'react-i18next';
//UI
import { makeStyles } from '@material-ui/core/styles';
import { CssButton } from '../UI/CssButton';
import Button from '@material-ui/core/Button'
import Icon from '@material-ui/core/Icon';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  buttonWrapper: {
    marginRight: theme.typography.pxToRem(10),
  },
  buttons: {
    width: theme.typography.pxToRem(40),
    height: theme.typography.pxToRem(28),
    borderRadius: 3,
  },
  icons: {
    fontSize: theme.typography.pxToRem(20),
  },
  dayWrapper: {
    marginLeft: theme.typography.pxToRem(10),
  },
}));

const CalendarHead = (props) => {
  const classes = useStyles();
  const { startedAt, timeZone, timeZoneOffset, onWeekChange } = props;
  const { t, i18n } = useTranslation(['translation']);
  const startOfweek = startedAt.clone().startOf('week');
  const endOfWeek = startOfweek.clone().day(7);

  const changeLanguage = (code) => {
    i18n.changeLanguage(code);
  };

  const getNextWeek = () => {
    onWeekChange(startOfweek.day(7));
  };

  const getPreviousWeek = () => {
    onWeekChange(startOfweek.day(-7));
  };

  const isPreviousButtonDisabled = () => {
    const today = moment();
    return today.isAfter(startOfweek);
  };

  const getTimeZoneOffset = () => {
    let string = '';
    string += `( GMT${Math.sign(timeZoneOffset) === 1 ? '+' : '-'}${timeZoneOffset / 60}:00 )`;
    return string;
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} container justify="space-between">
        <Typography variant="h6">{t('title')}</Typography>
        <Grid item>
          <CssButton type="button" onClick={() => changeLanguage('zh')}>
            {t('translation:中文')}
          </CssButton>
          <CssButton type="button" onClick={() => changeLanguage('en')}>
            {t('translation:en')}
          </CssButton>
        </Grid>
      </Grid>
      <Grid item xs={12} md={6} container alignItems="center">
        <Grid item className={classes.buttonWrapper}>
          <CssButton
            size="small"
            variant="outlined"
            color="primary"
            onClick={getPreviousWeek}
            disabled={isPreviousButtonDisabled()}
            className={`${classes.buttons}`}
          >
            <Icon className={classes.icons}>keyboard_arrow_left</Icon>
          </CssButton>
          <CssButton size="small" variant="outlined" color="primary" onClick={getNextWeek} className={classes.buttons}>
            <Icon className={classes.icons}>keyboard_arrow_right</Icon>
          </CssButton>
        </Grid>
        <Grid item className={classes.dayWrapper}>
          <Typography variant="subtitle1">
            {startOfweek.format('YYYY/MM/DD')} - {endOfWeek.format('DD')}
          </Typography>
        </Grid>
      </Grid>
      <Grid item xs={12} md={6} container justify="flex-end">
        <Typography variant="caption" noWrap>
          {t('captionPrefix')} {t(`${timeZone}`)} {getTimeZoneOffset()} {t('captionSufix')}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default CalendarHead;
