import { Typography } from '../Typography/Typography';
import { createStyles } from '../../theme/utils';
import { useState, useEffect, useCallback } from 'react';

const Timer = () => {
  const translateDay = (day: string) => {
    const days: { [key: string]: string } = {
      poniedziałek: 'Monday',
      wtorek: 'Tuesday',
      środa: 'Wednesday',
      czwartek: 'Thursday',
      piątek: 'Friday',
      sobota: 'Saturday',
      niedziela: 'Sunday',
    };
    return days[day.toLowerCase()];
  };

  const getFormattedTime = useCallback(() => {
    const date = new Date();
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      day: '2-digit',
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    };
    const formattedDate = date.toLocaleDateString('pl-PL', options);
    const [weekday, day, time] = formattedDate.split(', ');
    const translatedWeekday = translateDay(weekday);
    return `${translatedWeekday}, ${day} ${time}`;
  }, []);

  const [ctime, setTime] = useState(getFormattedTime());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(getFormattedTime());
    }, 1000);
    return () => clearInterval(timer);
  }, [getFormattedTime]);

  return (
    <div css={timerStyles.timer}>
      <Typography size="2xl" weight="bold">
        Kiosk Manager
      </Typography>
      <Typography size="lg" styles={timerStyles.text}>
        {ctime}
      </Typography>
    </div>
  );
};

export default Timer;

const timerStyles = createStyles({
  timer: ({ colors }) => ({
    color: colors.dark,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  }),
  text: {
    letterSpacing: '0.75px',
  },
});
