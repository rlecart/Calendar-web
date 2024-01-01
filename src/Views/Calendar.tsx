import * as React from 'react';
import styled from 'styled-components';
import axios from 'axios';

import { ICalendarEventData, ICalendarStore, useCalendarStore } from '../stores/calendarStore';

import WithAuthentication from '../containers/WithAuthentication';

import RenderIf from '../components/RenderIf';

import Header from '../components/Header';
import CalendarMonth from '../components/CalendarMonth';
import CalendarDay from '../components/CalendarDay';
import AddEventButton from '../components/AddEventButton';
import CalendarSelector from '../components/CalendarSelector';
import CalendarYear from '../components/CalendarYear';

import { API } from '../api';

const CalendarWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
`

const Calendar = () => {
  const calendarType = useCalendarStore((state: ICalendarStore) => state.calendarType);
  const calendarDate = useCalendarStore((state: ICalendarStore) => state.calendarDate);
  const setCalendarDate = useCalendarStore((state: ICalendarStore) => state.setCalendarDate);

  const setCalendarDayData = useCalendarStore((state: ICalendarStore) => state.setCalendarDayData);
  const setCalendarMonthData = useCalendarStore((state: ICalendarStore) => state.setCalendarMonthData);


  React.useEffect(() => {
    if (calendarDate.dayOfMonth === -1
      && calendarDate.month === -1
      && calendarDate.year === -1) {
      const today = new Date();

      setCalendarDate({
        dayOfMonth: today.getDate(),
        month: today.getMonth() + 1,
        year: today.getFullYear(),
      })
    }
  }, [])

  React.useEffect(() => {
    getCalendarData();
  }, [calendarType, calendarDate])

  const getCalendarData = async () => {
    try {
      if (calendarType === 'day') {
        const dayRes = await axios.get(`${API}/event/year/${calendarDate.year}/month/${calendarDate.month}/day/${calendarDate.dayOfMonth}`);
        if (dayRes.status !== 200)
          throw (dayRes.status)

        const dayData = {
          dayOfMonth: calendarDate.dayOfMonth,
          month: calendarDate.month,
          year: calendarDate.year,
          data: dayRes.data,
        }

        setCalendarDayData(dayData);
      }
      if (calendarType === 'month' || calendarType === 'day') {
        const monthRes = await axios.get(`${API}/event/year/${calendarDate.year}/month/${calendarDate.month}`);
        if (monthRes.status !== 200)
          throw (monthRes.status)

        const monthData = {
          month: calendarDate.month,
          year: calendarDate.year,
          data: Array.from(Array(31), (_, i) => {
            return {
              dayOfMonth: i + 1,
              month: calendarDate.month,
              year: calendarDate.year,
              data: monthRes.data.filter((event: ICalendarEventData) => event.dayOfMonth === i + 1)
            }
          })
        }

        setCalendarMonthData(monthData);
      }
      // else if (calendarType === 'year') {
      // }
    }
    catch (err) {
      console.log('getCalendarData err', err)
    }
  }

  return (
    <WithAuthentication>
      <CalendarWrapper>
        <Header />

        <RenderIf isTrue={calendarType === 'selector'}>
          <CalendarSelector />
        </RenderIf>

        <RenderIf isTrue={calendarType === 'year'}>
          <CalendarYear />
        </RenderIf>

        <RenderIf isTrue={calendarType === 'month'}>
          <CalendarMonth />
        </RenderIf>

        <RenderIf isTrue={calendarType === 'day'}>
          <CalendarDay />
        </RenderIf>

        <AddEventButton />

      </CalendarWrapper>
    </WithAuthentication>
  );
};

export default Calendar;