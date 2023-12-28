import * as React from 'react';

import WithAuthentication from '../containers/WithAuthentication';

import Header from '../components/Header';
import WeekDays from '../components/WeekDays';
import CalendarDays from '../components/CalendarDays';
import styled from 'styled-components';

const CalendarWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
`

const Calendar = () => {
  return (
    <WithAuthentication>
      <CalendarWrapper>
        <Header />

        <WeekDays />

        <CalendarDays type='month' />
      </CalendarWrapper>
    </WithAuthentication>
  );
};

export default Calendar;