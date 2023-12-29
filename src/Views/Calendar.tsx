import * as React from 'react';

import WithAuthentication from '../containers/WithAuthentication';

import Header from '../components/Header';
import WeekDays from '../components/WeekDays';
import CalendarMonth from '../components/CalendarMonth';
import styled from 'styled-components';
import RenderIf from '../components/RenderIf';
import CalendarDay from '../components/CalendarDay';
import { CalendarStoreInterface, useCalendarStore } from '../stores/calendarStore';
import AddEventButton from '../components/AddEventButton';

const CalendarWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
`

const Calendar = () => {
  const calendarType = useCalendarStore((state: CalendarStoreInterface) => state.calendarType);

  return (
    <WithAuthentication>
      <CalendarWrapper>
        <Header />

        <WeekDays />

        {/* <RenderIf isTrue={calendarType === 'year'}>
          <CalendarYear />
        </RenderIf> */}

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